import { useEffect, useState } from "react";
import { Content } from "./Content";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { DropdownCheckbox } from "./DropdownCheckbox";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const columns = [
    { name: "fund_name", value: "Fund Name" },
    { name: "primary_ticker", value: "Primary Ticker" },
    { name: "income_treatment", value: "Income Treatment" },
    { name: "share_class_currency", value: "Share Class Currency" },
    { name: "isin", value: "ISIN" },
    { name: "strategy", value: "Strategy" },
    { name: "asset_class", value: "Asset Class" },
    { name: "region", value: "Region" },
    { name: "style", value: "Style" },
  ];

  const catergories = {
    stategey: {name: 'Strategy', value: 'Strategy'},
    region: {name: 'Region', value: 'Region'},
    asset_class: {name: 'Asset_Class', value: 'Asset Class'},
    style: {name: 'Style', value: 'Style'}
  }

  const handleSearch = (e, data) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      const filteredResults = data.filter((item) =>
        item.fund_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filteredResults);
    } else {
      setFilteredProducts(products);
    }
  };

    const [regionFilter, setRegionFilter] = useState([]);
    const [strategyFilter, setStrategyFilter] = useState([]);
    const [assetFilter, setAssetFilter] = useState([]);
    const [styleFilter, setStyleFilter] = useState([]);

    const filtration = (data, regionFilter, strategyFilter, assetFilter, styleFilter) => {
      return data.filter(item => {
          const regionMatch = !regionFilter.length || regionFilter.includes(item.region);
          const strategyMatch = !strategyFilter.length || strategyFilter.includes(item.strategy);
          const assetMatch = !assetFilter.length || assetFilter.includes(item.asset_class);
          const styleMatch = !styleFilter.length || styleFilter.includes(item.style);
          
          return regionMatch && strategyMatch && assetMatch && styleMatch;
      });
  };

  const applyFilters = () => {
    if (selectedOptions.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(filtration(filteredProducts, regionFilter, strategyFilter, assetFilter, styleFilter));
    }
  };

  const handleCheckboxChange = (e, option, catergory) => {
    const { checked } = e.target;

    if(catergory === 'Region') {
        if (checked) {
          setRegionFilter([...regionFilter, option]);
        } else {
          setRegionFilter(regionFilter.filter(item => item !== option));
        }
    }
    
    if(catergory === 'Strategy') {
      if (checked) {
        setStrategyFilter([...strategyFilter, option]);
      } else {
        setStrategyFilter(strategyFilter.filter(item => item !== option));
      }
  } 
  if(catergory === 'Asset_Class') {
    if (checked) {
      setAssetFilter([...assetFilter, option]);
    } else {
      setAssetFilter(assetFilter.filter(item => item !== option));
    }
  } 
  
  if(catergory === 'Style') {
    if (checked) {
      setStyleFilter([...styleFilter, option]);
    } else {
      setStyleFilter(styleFilter.filter(item => item !== option));
    }
  }

    setSelectedOptions(prevSelectedOptions =>
        prevSelectedOptions.includes(option)
            ? prevSelectedOptions.filter(item => item !== option)
            : [...prevSelectedOptions, option]
    );
  };

  useEffect(() => {
    const url = `http://localhost:3004/products`;
    fetch(url)
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
        setFilteredProducts(products);
      });
      
  }, []);

  const setWidget = (widget) => {
    setCurrentWidget(widget);
  }

  const [currentWidget, setCurrentWidget] = useState('');
  return (
    <div>
      <h1 className="title">Product Finder</h1>
      <SearchBar value={searchQuery} data={filteredProducts} handler={handleSearch} />

      <DropdownCheckbox catergory={catergories.stategey} options={[
        {type: '', values: ['Thematic', 'Factors', 'Equity Income', 'Capitial Strength', 'Currency Hedge', 'ESG']},
    ]} setCurrentWidget={setWidget} handleCheckboxChange={handleCheckboxChange} selectedOptions={selectedOptions}/>

      <DropdownCheckbox catergory={catergories.region} options={[
        {type: 'Markets', values: ['Developed', 'Emerging']},
        {type: 'Region', values: ['Asia Pacific', 'Europe', 'Global']},
    ]} setCurrentWidget={setWidget} handleCheckboxChange={handleCheckboxChange} selectedOptions={selectedOptions}/>

      <DropdownCheckbox catergory={catergories.asset_class} options={[
        {type: 'Equity', values: ['Equity', 'Fixed Income']},
    ]} setCurrentWidget={setWidget} handleCheckboxChange={handleCheckboxChange} selectedOptions={selectedOptions}/>
    
      <DropdownCheckbox catergory={catergories.style} options={[
        {type: '', values: ['Active', 'Index']},
    ]} setCurrentWidget={setWidget} handleCheckboxChange={handleCheckboxChange} selectedOptions={selectedOptions}/>

      <button className="filterBtn" onClick={applyFilters}>Apply Filters</button>
      <button className="refreshBtn" onClick={() => setFilteredProducts(products)}>Refresh Results</button>
      <table className="products-table">
        <colgroup>
          <col span="4" style={{ backgroundColor: "#335776" }} />
          <col span="5" style={{ backgroundColor: "#063156" }}></col>
        </colgroup>
        <Header entriesLength={filteredProducts.length} columns={columns} />
        <Content entries={filteredProducts} columns={columns} selectedOptions={selectedOptions} currentWidget={currentWidget} filtration={filtration}/>
      </table>
      <footer className="footer">
        <h4>Showing {filteredProducts.length} Products out of {products.length}</h4>
      </footer>
    </div>
  );
};

export default ProductsTable;

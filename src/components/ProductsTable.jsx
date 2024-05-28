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
    stategey: {
      name: "Strategy",
      value: "Strategy",
      options: [
        {
          type: "",
          values: [
            { name: "Thematic", value: "Thematic" },
            { name: "Factors", value: "Factors" },
            { name: "Equity Income", value: "Equity Income" },
            { name: "Capitial Strength", value: "Capitial Strength" },
            { name: "Currency Hedge", value: "Currency Hedge" },
            { name: "ESG", value: "ESG" },
          ],
        },
      ],
    },
    region: {
      name: "Region",
      value: "Region",
      options: [
        {
          type: "Markets",
          values: [
            { name: "Developed", value: "Developed" },
            { name: "Emerging", value: "Emerging" },
          ],
        },
        {
          type: "Region",
          values: [
            { name: "Asia Pacific", value: "Asia Pacific" },
            { name: "Europe", value: "Europe" },
            { name: "Eurozone", value: "Eurozone" },
            { name: "Germany", value: "Germany" },
            { name: "Switzerland", value: "Switzerland" },
            { name: "United Kingdom", value: "United Kingdom" },
            { name: "Global", value: "Global" },
            { name: "North America", value: "North America" },
            { name: "United States", value: "United States" },
          ],
        },
      ],
    },
    asset_class: {
      name: "Asset_Class",
      value: "Asset Class",
      options: [
        {
          type: "Equity",
          values: [
            { name: "All Cap", value: "Equity" },
            { name: "Large Cap", value: "Equity" },
            { name: "Small Cap", value: "Equity" },
          ],
        },
        {
          type: "Fixed Income",
          values: [
            { name: "Goverment", value: "Fixed Income" },
            { name: "Currency", value: "Fixed Income" },
          ],
        },
      ],
    },
    style: {
      name: "Style",
      value: "Style",
      options: [
        {
          type: "",
          values: [
            { name: "Active", value: "Active" },
            { name: "Index", value: "Index" },
          ],
        },
      ],
    },
  };

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

  const handleCheckboxChange = (e, optionName, catergory) => {
    const { checked } = e.target;

    if(catergory === 'Region') {
      if (checked) {
        setRegionFilter([...regionFilter, optionName]);
      } else {
        setRegionFilter(regionFilter.filter(item => item !== optionName));
      }
    }
    
    if(catergory === 'Strategy') {
      if (checked) {
        setStrategyFilter([...strategyFilter, optionName]);
      } else {
        setStrategyFilter(strategyFilter.filter(item => item !== optionName));
      }
    } 
    if(catergory === 'Asset_Class') {
      if (checked) {
        setAssetFilter([...assetFilter, optionName]);
      } else {
        setAssetFilter(assetFilter.filter(item => item !== optionName));
      }
    } 
    
    if(catergory === 'Style') {
      if (checked) {
        setStyleFilter([...styleFilter, optionName]);
      } else {
        setStyleFilter(styleFilter.filter(item => item !== optionName));
      }
    }

    setSelectedOptions(prevSelectedOptions =>
        prevSelectedOptions.includes(optionName)
            ? prevSelectedOptions.filter(item => item !== optionName)
            : [...prevSelectedOptions, optionName]
    );
  };

  useEffect(() => {
    const url = `http://localhost:3004/products`;
    fetch(url)
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
        setFilteredProducts(products);
      })
      .catch((error) => {
        console.log("Fetch not working correctly", error)
      });
      
  }, []);

  return (
    <div>
      <h1 className="title">Product Finder</h1>
      <SearchBar value={searchQuery} data={filteredProducts} handler={handleSearch} />

      <DropdownCheckbox
        catergory={catergories.stategey} 
        handleCheckboxChange={handleCheckboxChange} 
        selectedOptions={selectedOptions}
      />

      <DropdownCheckbox 
        catergory={catergories.region} 
        handleCheckboxChange={handleCheckboxChange} 
        selectedOptions={selectedOptions}
      />

      <DropdownCheckbox 
        catergory={catergories.asset_class} 
        handleCheckboxChange={handleCheckboxChange} 
        selectedOptions={selectedOptions}
      />
    
      <DropdownCheckbox 
        catergory={catergories.style} 
        handleCheckboxChange={handleCheckboxChange} 
        selectedOptions={selectedOptions}
      />

      <button className="filterBtn" onClick={applyFilters} data-cy="apply-filter">Apply Filters</button>
      <button className="refreshBtn" onClick={() => setFilteredProducts(products)}>Refresh Results</button>

      <table className="products-table">
        <colgroup>
          <col span="4" style={{ backgroundColor: "#335776" }} />
          <col span="5" style={{ backgroundColor: "#063156" }}></col>
        </colgroup>
        <Header entriesLength={filteredProducts.length} columns={columns} />
        <Content entries={filteredProducts} columns={columns}/>
      </table>

      <footer className="footer">
        <h4>Showing {filteredProducts.length} Products out of {products.length}</h4>
      </footer>
    </div>
  );
};

export default ProductsTable;

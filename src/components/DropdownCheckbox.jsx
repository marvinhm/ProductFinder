import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/DropdownCheckbox.css';

export const DropdownCheckbox = ({ catergory, handleCheckboxChange, selectedOptions }) => {
    const [isOpen, setIsOpen] = useState(false);


    const onChangeHandler = (e, optionName, optionValue, catergoryName) => {

        handleCheckboxChange(e, optionName, catergoryName); 
    }
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="dropdown-container">
            <button onClick={toggleDropdown} className="dropdown-button">
                {catergory.value}
                <i className={`arrow ${isOpen ? 'down' : 'up'}`}></i>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {catergory.options.map((option, index) => (
                        <div key={index} className="dropdown-item">
                        <label className="dropdown-label">{option.type}</label>

                            {option.values.map((val, index) => (
                                <label key={index}>
                                    <input
                                        className='checkbox'
                                        type="checkbox"
                                        checked={selectedOptions.includes(val.name)}
                                        onChange={(e) => onChangeHandler(e, val.name, val.value, catergory.name)}
                                    />
                                    <span className="checkmark"></span>
                                    {val.name}
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

DropdownCheckbox.propTypes = {
    catergory: PropTypes.object,
    options: PropTypes.array,
    setCurrentWidget: PropTypes.string,
    handleCheckboxChange: PropTypes.func,
    selectedOptions: PropTypes.array,
}
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/DropdownCheckbox.css';

export const DropdownCheckbox = ({ catergory, options, setCurrentWidget, handleCheckboxChange, selectedOptions }) => {
    const [isOpen, setIsOpen] = useState(false);


    const handler = (e, option) => {

        setCurrentWidget(catergory.name);
        handleCheckboxChange(e, option, catergory.name); 
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
                    {options.map((option, index) => (
                        <div key={index} className="dropdown-item">
                        <label className="dropdown-label">{option.type}</label>

                            {option.values.map((val, index) => (
                                <label key={index}>
                                    <input
                                        className='checkbox'
                                        type="checkbox"
                                        checked={selectedOptions.includes(val)}
                                        onChange={(e) => handler(e, val, catergory.name)}
                                    />
                                    <span className="checkmark"></span>
                                    {val}
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
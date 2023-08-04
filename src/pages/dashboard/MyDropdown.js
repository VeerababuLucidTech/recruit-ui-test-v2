import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const MyDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([
    { label: 'orange', value: 'orange' },
    { label: 'white', value: 'white' },
    { label: 'purple', value: 'purple' }
  ]);

  const handleChange = (event) => {
    setSelectedOption(event.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newOption = {
        label: inputValue,
        value: inputValue
      };
      setOptions([...options, newOption]);
      setSelectedOption(inputValue);
      setInputValue('');
    }
  };

  const valueTemplate = (option) => option.label;

  return (
    <Dropdown
      options={options}
      value={selectedOption}
      onChange={handleChange}
      filter
      filterPlaceholder="Select"
      placeholder="Select"
      editable={true}
      onKeyDown={handleKeyDown}
      updateModel={false}
      valueTemplate={valueTemplate}
      onInputChange={(event) => setInputValue(event.target.value)}
    />
  );
};

export default MyDropdown;

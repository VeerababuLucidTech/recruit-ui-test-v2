import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

export default function EditableDemo() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [inputCity, setInputCity] = useState('');

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  const handleChange = (e) => {
    if (e.value) {
      setSelectedCity(e.value);
    } else {
      setSelectedCity(null);
    }
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newCity = { name: inputCity, code: inputCity };
      cities.push(newCity);
      setSelectedCity(newCity);
      setInputCity('');
    }
  };

  const valueTemplate = (option) => option.name;

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedCity}
        onChange={handleChange}
        options={cities}
        optionLabel="name"
        editable
        placeholder="Select a City"
        className="w-full md:w-14rem"
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        valueTemplate={valueTemplate}
      />
    </div>
  );
}

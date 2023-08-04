import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const DropdownComponent = ({ options, value, onChange }) => {
    return (
        <Dropdown
            options={options}
            value={value}
            onChange={onChange}
            placeholder="Select an option"
        />
    );
};

export default DropdownComponent;

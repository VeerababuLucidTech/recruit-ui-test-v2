import React from 'react';
import { Button } from 'primereact/button';

const MultiButton = ({ buttons }) => {
    return (
        <div>
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    label={button.label}
                    icon={button.icon}
                    iconPos={button.iconPos}
                    onClick={button.onClick}
                    className='sidebar-header-btn'
                />
            ))}
        </div>
    );
};

export default MultiButton;

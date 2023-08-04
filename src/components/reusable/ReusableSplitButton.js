import React, { useState } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { Sidebar } from 'primereact/sidebar';

const ReusableSplitButton = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        console.log('Option selected:', option);
        setSelectedOption(option);
    };

    const hideSidebar = () => {
        setSelectedOption(null);
    };

    const renderSidebarContent = () => {
        switch (selectedOption) {
            case 'Timesheet':
                return (
                    <div>
                        <h1>Timesheet</h1>
                        {/* Add Timesheet-specific content here */}
                    </div>
                );
            case 'Documents':
                return (
                    <div>
                        <h1>Documents</h1>
                        {/* Add Documents-specific content here */}
                    </div>
                );
            case 'Note':
                return (
                    <div>
                        <h1>Note</h1>
                        {/* Add Note-specific content here */}
                    </div>
                );
            case 'Abc':
                return (
                    <div>
                        <h1>Abc</h1>
                        {/* Add Note-specific content here */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <SplitButton
                label="Add"
                icon="pi pi-plus"
                model={options.map((option) => ({
                    ...option,
                    command: () => handleOptionSelect(option.label)
                }))}
                className='custom-split-button custom-p-button'
            />
            {selectedOption && (
                <Sidebar visible={true} onHide={hideSidebar} fullScreen>
                    {renderSidebarContent()}
                </Sidebar>
            )}
        </div>
    );
};

export default ReusableSplitButton;

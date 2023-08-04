import React, { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Sidebar } from 'primereact/sidebar';

const EmployeeSplitButton = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const overlayRef = useRef(null);

    const options = [
        { label: 'Timesheet', icon: 'pi pi-calendar', command: () => handleOptionSelect('Timesheet') },
        { label: 'Documents', icon: 'pi pi-file', command: () => handleOptionSelect('Documents') },
        { label: 'Note', icon: 'pi pi-pencil', command: () => handleOptionSelect('Note') },
    ];

    const handleOptionSelect = (option) => {
        console.log('Option selected:', option);
        setSelectedOption(option);
        overlayRef.current.hide();
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
                        {/* <AddResource /> */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <i
                ref={overlayRef}
                className="pi pi-ellipsis-v custom-split-button custom-p-button"
                style={{ fontSize: '1.2rem', cursor: 'pointer', backgroundColor: 'transparent !important', border: 'none' }}
                onClick={(event) => overlayRef.current.toggle(event)}
            />
            <OverlayPanel
                ref={overlayRef}
                showCloseIcon={false}
                dismissable={true}
                style={{ width: '210px' }}
            >
                {options.map((option) => (
                    <button
                        key={option.label}
                        className="p-link"
                        onClick={option.command}
                    >
                        <span className={`pi ${option.icon}`} style={{ marginRight: '12px' }} />
                        {option.label}
                    </button>
                ))}
            </OverlayPanel>
            {selectedOption && (
                <Sidebar visible={true} onHide={hideSidebar} fullScreen>
                    {renderSidebarContent()}
                </Sidebar>
            )}
        </div>
    );
};

export default EmployeeSplitButton;

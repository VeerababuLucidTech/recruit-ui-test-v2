import React, { useRef, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';

export default function SettingsSwitch() {
  const menuLeft = useRef(null);
  const menuRight = useRef(null);
  const toast = useRef(null);
  const [options, setOptions] = useState({
    update: false,
    delete: false,
    reactWebsite: false,
    router: false
  });

  const handleOptionToggle = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option]
    }));
  };

  const handleUpdate = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Updated',
      detail: 'Data Updated',
      life: 3000
    });
  };

  const handleDelete = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Delete',
      detail: 'Data Deleted',
      life: 3000
    });
  };

  const handleReactWebsiteNavigation = () => {
    window.open('https://reactjs.org/', '_blank');
  };

  const handleRouterNavigation = () => {
    // Perform navigation logic using router, e.g., router.push('/fileupload');
  };

  const items = [
    {
      label: (
        <div className="p-d-flex p-ai-center">
          <span className="p-mr-2">Options</span>
          <InputSwitch
            className="p-mr-2"
            checked={options.update}
            onChange={() => handleOptionToggle('update')}
          />
        </div>
      ),
      command: handleUpdate
    },
    {
      label: (
        <div className="p-d-flex p-ai-center">
          <span className="p-mr-2">Delete</span>
          <InputSwitch
            className="p-mr-2"
            checked={options.delete}
            onChange={() => handleOptionToggle('delete')}
          />
        </div>
      ),
      command: handleDelete
    },
    {
      label: (
        <div className="p-d-flex p-ai-center">
          <span className="p-mr-2">React Website</span>
          <InputSwitch
            className="p-mr-2"
            checked={options.reactWebsite}
            onChange={() => handleOptionToggle('reactWebsite')}
          />
        </div>
      ),
      command: handleReactWebsiteNavigation
    },
    {
      label: (
        <div className="p-d-flex p-ai-center">
          <span className="p-mr-2">Router</span>
          <InputSwitch
            className="p-mr-2"
            checked={options.router}
            onChange={() => handleOptionToggle('router')}
          />
        </div>
      ),
      command: handleRouterNavigation
    }
  ];

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>
      <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
      <Button
        label="Show Left"
        icon="pi pi-align-left"
        className="mr-2"
        onClick={(event) => menuLeft.current.toggle(event)}
        aria-controls="popup_menu_left"
        aria-haspopup
      />
    </div>
  );
}

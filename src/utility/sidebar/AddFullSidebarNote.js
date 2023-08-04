
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import plusIcon from '../../assets/plusIcon.svg';
import Steps3 from '../../pages/dashboard/steps/Steps3';

export default function AddFullSidebarNote({ sidebarToBeRender }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className=" flex justify-content-center ">
            <Sidebar position='right' visible={visible} onHide={() => setVisible(false)} fullScreen>
                {sidebarToBeRender === "resources" && <Steps3 />}
            </Sidebar>
            {/* <img src={plusIcon} className='' onClick={() => setVisible(true)} /> */}
            <Button className='company-primary-btn l-fs-10' icon="pi pi-plus" onClick={() => setVisible(true)} />
           
        </div>
    )
}

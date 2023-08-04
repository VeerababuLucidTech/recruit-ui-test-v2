import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { Image } from 'primereact/image';
import Image from 'react-bootstrap/Image';
import ChatEmailCallButtons from './ChatEmailCallButtons';

const EmployeeTimesheetHeader = ({ empImage, empName, empType, status }) => {

    const buttons = [
        {
            label: 'View',
            icon: 'pi pi-eye',
            iconPos: 'left',
            onClick: () => console.log('View button clicked'),
        },
        {
            label: 'Upload New Sheet',
            icon: 'pi pi-upload',
            iconPos: 'left',
            onClick: () => console.log('Upload New Sheet button clicked'),
        },
        {
            label: 'Download',
            icon: 'pi pi-download',
            iconPos: 'left',
            onClick: () => console.log('Download button clicked'),
        },
    ];

    return (
        <>
            <div>
                <Row>
                    <Col sm={2} xs={3} md={2} lg={2} className='text-center'>
                        <Image src={empImage} alt={empImage} width="75" height='75' roundedCircle />
                    </Col>
                    <Col sm={10} xs={9} md={10} lg={10} className=''>
                        <div className='d-flex'>
                            <h5 className='l-fw-700 pe-2 overflow-text-ellipsis'>{empName}</h5>
                            {/* <h6 className='me-2 pt-1 copany-color-secondary'>{empType}</h6> */}
                            <p className='mt-1'>
                                <span className='sidebar-header-status'>{status}</span>
                            </p>
                        </div>
                        <ChatEmailCallButtons buttons={buttons} />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default EmployeeTimesheetHeader;
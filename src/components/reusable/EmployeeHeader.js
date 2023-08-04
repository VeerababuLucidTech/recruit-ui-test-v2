import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { Image } from 'primereact/image';
import Image from 'react-bootstrap/Image';
import ChatEmailCallButtons from './ChatEmailCallButtons';

const EmployeeHeader = ({ empImage, empName, empType, status }) => {

    const buttons = [
        {
            label: 'Email',
            icon: 'pi pi-envelope',
            iconPos: 'left',
            onClick: () => console.log('Eami button clicked'),
        },
        {
            label: 'Call',
            icon: 'pi pi-phone',
            iconPos: 'left',
            onClick: () => console.log('Call button clicked'),
        },
        {
            label: 'Chat',
            icon: 'pi pi-comment',
            iconPos: 'left',
            onClick: () => console.log('Chat button clicked'),
        },
    ];

    return (
        <>
            <div>
                <Row>
                    <Col sm={2} xs={3} md={3} lg={2} className='text-center'>
                        <Image src={empImage} alt={empImage} width="75" height='75' roundedCircle />
                    </Col>
                    <Col sm={10} xs={9} md={9} lg={10} className=''>
                        <div className='d-flex'>
                            <h5 className='l-fw-700 pe-2 overflow-text-ellipsis'>{empName}</h5>
                            <h6 className='me-2 pt-1 copany-color-secondary'>{empType}</h6>
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

export default EmployeeHeader;
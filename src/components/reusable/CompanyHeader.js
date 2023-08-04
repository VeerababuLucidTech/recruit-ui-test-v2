import React from 'react';
import { Col, Row } from 'react-bootstrap';
// import { Image } from 'primereact/image';
import Image from 'react-bootstrap/Image';

const CompanyHeader = ({ companyImage, companyTitle, contractCategory, status, contractID }) => {

    return (
        <>
            <div>
                <Row>
                    <Col sm={2} xs={3} md={3} lg={2}>
                        <Image src={companyImage} alt={companyImage} width="75" height='75' roundedCircle />
                    </Col>
                    <Col sm={10} xs={9} md={9} lg={10} className=''>
                        <div className='d-flex'>
                            <h5 className='l-fw-700 pe-2 overflow-text-ellipsis'>{companyTitle}</h5>
                            <h6 className='me-2 pt-1 copany-color-secondary'>{contractCategory}</h6>
                        </div>
                        <div className='d-flex'>
                            <p className='mt-1 me-2'>
                                <span className=''>{contractID}</span>
                            </p>
                            <p className='mt-1'>
                                <span className='sidebar-header-status'>{status}</span>
                            </p>
                        </div>

                    </Col>
                </Row>
            </div>
        </>
    );
};

export default CompanyHeader;
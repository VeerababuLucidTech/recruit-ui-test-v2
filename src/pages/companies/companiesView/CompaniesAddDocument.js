import React, { useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FileUploader } from "react-drag-drop-files";
import plusIcon from '../../../assets/plusIcon.png';

function CompaniesAddDocument(props) {

    const fileTypes = ["JPEG", "PDF", "PNG", "GIF", "DOC"];
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            {/* <Dropdown.Item onClick={handleShow}>Add Document</Dropdown.Item> */}
            {/* <Dropdown.Item onClick={handleShow}><img src={plusIcon} className='' /></Dropdown.Item> */}
            <img src={plusIcon} className='pe-3' onClick={handleShow}/>
            
            <Modal show={show} onHide={handleClose}
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Documents</Modal.Title>
                </Modal.Header>
                <Modal.Body className='mb-2'>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Employee</Form.Label>
                            <Form.Select aria-label="Select Employee">
                                <option>Select Employee</option>
                                <option value="1">C2C</option>
                                <option value="2">W2</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Document Name</Form.Label>
                            <Form.Control type="text" placeholder='Work Authorisation' required />
                        </Col>
                    </Row>
                    <Row className="g-1 mb-2">
                        <Col md={6}>
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="text" placeholder='-' required />
                        </Col>
                        <Col md={3}>
                            <Form.Label>Issue Date</Form.Label>
                            <Form.Control type="date" required />
                        </Col>
                        <Col md={3}>
                            <Form.Label>Exp Date</Form.Label>
                            <Form.Control type="date" required />
                        </Col>
                    </Row>
                    <Row className=" mt-4  ms-1 me-1">
                        <FileUploader
                            multiple={true}
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        />
                        <p className='pt-3'>{file ? `File name: ${file[0].name}` : " "}</p>
                    </Row>
                    <Row className="mb-2 l-bg-grey">
                        <Col>
                            <h6 className='mt-2 l-text-orange l-fs-14'>+ ADD A NEW DOCUMENT</h6>
                        </Col>
                    </Row>

                    {/* <Row>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Upload Documents</Form.Label>
                            <Form.Control type="file" multiple />
                        </Form.Group>
                    </Row> */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='l-bg-orange' variant="primary" onClick={handleClose}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default CompaniesAddDocument;
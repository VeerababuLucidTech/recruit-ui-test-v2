import React, { useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function CompaniesAddNote(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Dropdown.Item onClick={handleShow}>Add Note</Dropdown.Item>
            <Modal show={show} onHide={handleClose}
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body className='mb-2'>
                    <Row className="g-3 mb-2">
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Note</Form.Label>
                                <Form.Control as="textarea" rows={5} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3">
                            <Form.Group className="">
                                <Form.Check
                                    required
                                    label="Make it Private (Candidate will not get update on Notes)"
                                    feedback="You must agree before submitting."
                                    feedbackType="invalid"
                                    checked
                                />
                            </Form.Group>
                        </Col>
                    </Row>
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

export default CompaniesAddNote;
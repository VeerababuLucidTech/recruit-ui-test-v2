// import React from 'react'
import React, { useState } from "react";
import { Button, CloseButton, Container, InputGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const CompaniesEdit = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const [dateValue, setDateValue] = useState("");
  const handleDateChange = (value) => {
    setDateValue(value);
  };

  return (
    <>
      <Container fluid="md" className='m-0'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="g-3 mb-2">
            <Col md>
              <Form.Label>Promotion Name</Form.Label>
              <Form.Control type='text' placeholder='--' />
            </Col>
          </Row>
          <Row className="g-3 mb-2">
            <Col md="6">
              <Form.Label>Code</Form.Label>
              <Form.Control type="text" placeholder='--' />
            </Col>
            <Col md="3">
              <Form.Label>Value</Form.Label>
              <Form.Control type="text" placeholder=' 50 ' />
            </Col>
            <Col md="3">
              <Form.Label></Form.Label>
              <Form.Select type="text" placeholder='fixed %' >
                <option>Fixed %</option>
                <option>%</option>

              </Form.Select>
            </Col>
          </Row>
          <Row className="g-3 mb-2">
            <Col md>
              <Form.Label>Start On</Form.Label>
              <Form.Control type="date" disabled />
              {/* <DateMask></DateMask> */}
            </Col>
            <Col md>
              <Form.Label>Experied On</Form.Label>
              <Form.Control type="date" required />
              {/* <DateMask></DateMask> */}
            </Col>
          </Row>

          <Row className="g-3 mb-2">
            <Col md>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="l-edit-button">
            <Col md>
              <Link to="/tasks">
                <Button className='bg-secondary me-2'>Cancel</Button>
              </Link>
              <Button type='submit' className='l-bg-orange'>Create</Button>
            </Col>
          </Row>
        </Form >
      </Container >
    </>
  )
}

export default CompaniesEdit;
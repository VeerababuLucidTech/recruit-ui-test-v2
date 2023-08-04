import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import { RiPencilFill } from 'react-icons/ri';

function CompaniesView({ eachDetail }) {
  return (
    <>
      <Container fluid="md" className="mt-2 ">
        <Row className="border-bottom pt-2 pb-1">
          <Col>
            <h6 className="l-fs-18">Profile</h6>
          </Col>
          <Col className="text-end">
            <Form className="d-inline-flex pt-1">
              <Form.Check
                type="switch"
                id="custom-switch"
              // label="Check this switch"
              />
              <RiPencilFill className="ms-3 mt-1" />
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Row>
            <Col className="mb-3">
              <h6 className="l-fs-14 l-color-grey">Company Name</h6>
              <h6 className="l-fs-14 text-break">{eachDetail.companyName}</h6>
            </Col>
            <Col className="mb-3">
              <h6 className="l-fs-14 l-color-grey">Location</h6>
              <h6 className="l-fs-14 text-break">{eachDetail.location}</h6>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3">
              <h6 className="l-fs-14 l-color-grey">CEO Name</h6>
              <h6 className="l-fs-14 text-break">{eachDetail.ceoName}</h6>
            </Col>
            <Col className="mb-3">
              <h6 className="l-fs-14 l-color-grey">CEO Phone</h6>
              <h6 className="l-fs-14">{eachDetail.ceoPhone}</h6>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3">
              <h6 className="l-fs-14 l-color-grey">Role</h6>
              <h6 className="l-fs-14">{eachDetail.role}</h6>
            </Col>
            <Col className="mb-3">
              <h6 className="l-fs-14 l-color-grey">Created On</h6>
              <h6 className="l-fs-14">{eachDetail.createdOn}</h6>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}
export default CompaniesView;

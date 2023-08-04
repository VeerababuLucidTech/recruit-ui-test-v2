import { Offcanvas, Button, Dropdown, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import user1 from '../../assets/user1.png';
import CompaniesViewTabs from './companiesView/CompaniesViewTabs';
import CompaniesEdit from './CompaniesEdit';
import CompanySplitButton from '../../components/reusable/CompanySplitButton';
import CompanyHeader from '../../components/reusable/CompanyHeader';
import axios from 'axios';

function CompaniesCanvas({ componentToBeRendered, eachDetail, title }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [companyHeader, setCompanyHeader] = useState([]);

  useEffect(() => {
    var companyHeader = axios.get("http://localhost:4000/companyHeader")
      .then(response => {
        setCompanyHeader(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  return (
    <>
      {componentToBeRendered === "edit" && <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>}
      {componentToBeRendered === "view" && <Dropdown.Item onClick={handleShow}>View</Dropdown.Item>}
      {componentToBeRendered === "addNote" && <Dropdown.Item onClick={handleShow}>Add Note</Dropdown.Item>}

      <Offcanvas show={show} onHide={handleClose} placement="end" className='l-width-80'>
        <Offcanvas.Header closeButton className='company-layout-bg'>
          <Container fluid>
            <Row>
              <Col md={8} lg={8} xs={12}>
                <>
                  {
                    companyHeader.map((item) => (
                      <CompanyHeader companyImage={item.companyImage}
                        companyTitle={item.companyTitle}
                        contractCategory={item.contractCategory}
                        contractID={item.contractID}
                        status={item.status} />
                    ))
                  }
                </>
              </Col>
              <Col md={4} lg={4} xs={12} className='text-end pe-3'>
                <CompanySplitButton />
              </Col>
            </Row>
          </Container>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {componentToBeRendered === "edit" && <CompaniesEdit />}
          {componentToBeRendered === "view" && <CompaniesViewTabs eachDetail={eachDetail} />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default CompaniesCanvas;

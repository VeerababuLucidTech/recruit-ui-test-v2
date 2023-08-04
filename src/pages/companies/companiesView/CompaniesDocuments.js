import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Container, Table , Form, Nav, Navbar} from 'react-bootstrap'
import CompaniesOptions from '../CompaniesOptions';
import plusIcon from '../../../assets/plusIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import ResourceAddDocument from '../../resources/ResourceAddDocument';
import CompaniesAddDocument from './CompaniesAddDocument';

function CompaniesDocuments() {
  const URL = "http://localhost:4000/companiesDocuments";

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Container fluid className='p-2'>
        <Navbar bg="" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#" className='l-fs-18'>Showing 3 Entries</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >

              </Nav>
              <Form className="d-flex">
                 {/* <Button variant="outline-danger" className="me-3"> + </Button> */}
                 <CompaniesAddDocument/>
                 {/* <img src={plusIcon} className='me-3' /> */}
                 
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Table responsive hover className="l-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Resource Id</th>
              <th>Doc.Number</th>
              <th>Upload Date</th>
              <th>Expire Date</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((list, index) => {
              return (
                <tr key={index}>
                  <td>{list.title}</td>
                  <td>{list.resourceId}</td>
                  <td>{list.documentNumber}</td>
                  <td>{list.uploadDate}</td>
                  <td>{list.expiryDate}</td>
                  <td className="text-center">
                    {/* <CompaniesOptions eachDetail={list}/> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default CompaniesDocuments
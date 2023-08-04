import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap'
import CompaniesOptions from '../CompaniesOptions';
// import ResourceOptions from '../ResourceOptions';
// import ResourceTabs from './ResourceTabs';

function CompaniesUsers() {
  const URL = "http://localhost:4000/companiesUsers";

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Container fluid className='p-2'>
        <Table responsive hover className="l-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((list, index) => {
              return (
                <tr key={index}>
                  <td>{list.userName}</td>
                  <td>{list.role}</td>
                  <td>{list.email}</td>
                  <td>{list.phone}</td>
                  <td>{list.createdOn}</td>
                  <td><span className='l-bg-grey p-1 ps-3 pe-3 border rounded l-fs-12'>{list.status}</span></td>
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

export default CompaniesUsers
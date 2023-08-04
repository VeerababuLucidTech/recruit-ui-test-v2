import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap'

function CompaniesResources() {
  const URL = "http://localhost:4000/companiesResources";

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
              <th>Resource ID</th>
              <th>Contract ID</th>
              <th >W/O Rate <br/><span className='l-fs-10'>R | O | V</span></th>
              <th></th>
              <th></th>
              <th>Resource Name</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((list, index) => {
              return (
                <tr key={index}>
                  <td>{list.resourceId}</td>
                  <td>{list.contractId}</td>
                  <td>{list.woRate}</td>
                  <td>{list.woRate}</td>
                  <td>{list.woRate}</td>
                  <td>{list.resourceName}</td>
                  <td>{list.role}</td>
                  <td>{list.joinDate}</td>
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

export default CompaniesResources
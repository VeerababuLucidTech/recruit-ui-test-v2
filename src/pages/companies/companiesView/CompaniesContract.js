import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap'

function CompaniesContract() {
    const URL = "http://localhost:4000/companiesContract";

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
                            <th>Contract ID</th>
                            <th>Contract Title</th>
                            <th>Contract Type</th>
                            <th>Role</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {data.map((list, index) => {
                            return (
                                <tr key={index}>
                                    <td>{list.contractId}</td>
                                    <td>{list.contractTitle}</td>
                                    <td>{list.contractType}</td>
                                    <td>{list.role}</td>
                                    <td>{list.startDate}</td>
                                    <td>{list.endDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default CompaniesContract
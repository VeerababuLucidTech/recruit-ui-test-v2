import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CompaniesView from "../CompaniesView";
import ComapaniesNotes from "./ComapaniesNotes";
import CompaniesDocuments from "./CompaniesDocuments";
import CompaniesUsers from "./CompaniesUsers";
import CompaniesResources from './CompaniesResources';
import CompaniesContract from "./CompaniesContract";
import CompaniesDeductions from "./CompaniesDeductions";
import CompaniesHistory from "./CompaniesHistory";
// import { useNavigate } from "react-router-dom";

function CompaniesViewTabs({ eachDetail }) {
    // const navigate = useNavigate;
    // const [key, setKey] = useState('home');
    return (
        <>
            <>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-0"
                >
                    <Tab eventKey="profile" title="Profile">
                        <CompaniesView eachDetail={eachDetail} />
                    </Tab>
                    <Tab eventKey="note" title="Note">
                        <ComapaniesNotes />
                    </Tab>
                    <Tab eventKey="documents" title="Documents">
                        <CompaniesDocuments />
                    </Tab>
                    <Tab eventKey="users" title="Users">
                        <CompaniesUsers />
                    </Tab>
                    <Tab eventKey="resources" title="Resources">
                        <CompaniesResources />
                    </Tab>
                    <Tab eventKey="contract" title="Contract">
                        <CompaniesContract />
                    </Tab>
                    <Tab eventKey="deductions" title="Deductions">
                        <CompaniesDeductions />
                    </Tab>
                    <Tab eventKey="history" title="History">
                        <CompaniesHistory />
                    </Tab>

                </Tabs>
            </>
        </>
    );
}

export default CompaniesViewTabs;
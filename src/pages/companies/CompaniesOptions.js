import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import ResourceAddNote from "./CompaniesAddNote";
import CompaniesCanvas from "./CompaniesCanvas";

function CompaniesOptions({ eachDetail }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-basic" className="l-dropdown-toggle">
        <BsThreeDotsVertical />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >
          <CompaniesCanvas eachDetail={eachDetail} componentToBeRendered={"view"} title={eachDetail.companyName} />
        </Dropdown.Item>
        <Dropdown.Item >
          <CompaniesCanvas componentToBeRendered={"edit"} title={"Edit Resource"} />
        </Dropdown.Item>
        <Dropdown.Item>
          <ResourceAddNote />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CompaniesOptions;


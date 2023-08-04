import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import filterIcon from '../../assets/filterIcon.svg';
import AddSidebarRight from "../../components/reusable/AddSidebarRight";

function CompaniesTabs() {
    return (
        <>
            <Stack direction="horizontal" gap={3} >
                <div className="ms-auto ">
                    <Button variant="secondary" size="sm">
                        Export
                    </Button>
                </div>

                <div className="">
                    {/* <RiFilter2Fill /> */}
                    <img src={filterIcon} className='' />
                </div>
                <AddSidebarRight sidebarToBeRender={"addCompany"} />

                {/* <div className="l-fs-20 l-fw-500 l-color-grey"><RiFilter2Fill /></div> */}
                {/* <Link to="/addContract"> <BsFillPlusSquareFill className="l-fs-20 l-fw-500 l-color-orange" /></Link> */}
                {/* <AddSidebarRight sidebarToBeRender={"addCompany"} /> */}

                {/*
                 <div>
                    <Form >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                </div> 
                */}
            </Stack>
        </>
    );
}

export default CompaniesTabs;

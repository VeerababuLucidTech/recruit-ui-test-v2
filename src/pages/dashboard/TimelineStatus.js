import React from "react";
import { Timeline } from "primereact/timeline";

function TimelineStatus() {
    const timelineDetails = [
        {
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            description: "Changed the Status to ",
            status: "Not in Consideration",
            name: "Vinod Kumar",
            date: "Jun 28, 2020 10:30 PM",
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
            description: "Changed the Status to ",
            status: "Assigned",
            name: "Sri Ram",
            date: "Jun 29, 2020 10:30 PM",
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            description: "Changed the Status to ",
            status: "Not in Consideration",
            name: "Vinod Kumar",
            date: "Jun 28, 2020 10:30 PM",
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
            description: "Changed the Status to ",
            status: "Assigned",
            name: "Sri Ram",
            date: "Jun 29, 2020 10:30 PM",
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            description: "Changed the Status to ",
            status: "Not in Consideration",
            name: "Vinod Kumar",
            date: "Jun 28, 2020 10:30 PM",
        }

    ];

    return (
        <>

            <Timeline
                className="custom-timeline"
                align="left"
                value={timelineDetails}
                content={(item) => (
                    <div className="container text-color-secondary d-flex" style={{ marginTop: "-5px" }}>
                        <div className="d-flex">
                            <div>
                                <img src={item.image} className="me-2" style={{ width: "22px", height: "22px", }} />
                            </div>
                            <div className="">
                                <small className="text-wrap">{item.description}<span className="text-success fw-bold">{item.status}</span></small>
                                <h6>{item.name}</h6>
                                <p>{item.date}</p>
                            </div>
                        </div>
                    </div>
                )}
            />

        </>
    );
}
export default TimelineStatus
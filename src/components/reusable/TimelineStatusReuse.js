import React from "react";
import { Timeline } from "primereact/timeline";

function TimelineStatusReuse({ timelineDetails }) {
    return (
        <>
            <div className="d-flex">
                <Timeline
                    className="custom-timeline"
                    align="left"
                    value={timelineDetails}
                    content={(item) => (
                        <div
                            className="container text-color-secondary d-flex"
                            style={{ marginTop: "-5px" }}
                        >
                            <div className="d-flex">
                                <div>
                                    <img
                                        src={item.image}
                                        className="custom-timeline-img"
                                        alt="img"
                                    />
                                </div>
                                <div className="">
                                    <small className="text-wrap">
                                        {item.description}
                                        <span className="text-success fw-bold">{item.status}</span>
                                    </small>
                                    <h6>{item.name}</h6>
                                    <p>{item.date}</p>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </>
    );
}

export default TimelineStatusReuse;

import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';

const Widget = ({ title, value, graphData }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    return (
        <>
            {isLoading ? (
                <div>
                    <Skeleton width="100%" height="5rem" />
                </div>
            ) : (
                <Card className="widgets custom-card">
                    <h2 className="l-fs-14 l-fw-500 l-color-widget-lable" style={{ display: 'contents' }}>
                        {title}
                    </h2>
                    <h6 className="l-fs-20 l-fw-700">
                        {value} <span className='ps-3'><i className="pi pi-spin pi-spinner"></i></span>
                    </h6>
                </Card>
            )}
        </>
    );
};

export default Widget;

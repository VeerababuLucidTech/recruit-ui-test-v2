import React from 'react';
import { Button, Row } from 'react-bootstrap';

function CustomButton(props) {
    // button 
    const handleClick = () => {
        console.log('Button clicked');
    };

    return (
        <>
            <Button className={props.className} variant={props.variant} onClick={props.onClick}>
                {props.text}
            </Button>
            <Row>
                <div>
                    <CustomButton variant="secondary" onClick={handleClick} text="Cancel" />
                    <CustomButton className="l-bg-orange" variant="" onClick={handleClick} text="Update" />
                </div>
            </Row>
        </>
    );
}

export default CustomButton;

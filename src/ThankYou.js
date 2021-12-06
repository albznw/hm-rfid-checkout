import React from "react";

function ThankYou(props) {

    const handleButtonClick = () => {
        props.btnCallback();
    };

    return (
        <div className="ThankYou">
            <h1>Thank you!</h1>
            <p>Welcome back another time</p>
            <div className="thank-you-btn-div">
                <button onClick={handleButtonClick} className="btn-border">
                    New Session
                </button>
            </div>
        </div>
    )
}

export default ThankYou;


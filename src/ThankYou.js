import React from "react";

function ThankYou(props) {
    
    const handleButtonClick = () => {
        props.btnCallback();
    };

    return(
        <div className="ThankYou">
            <p>Thank you!</p>
            <button onClick={handleButtonClick}>New session</button>
        </div>
    )
}

export default ThankYou;


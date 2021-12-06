import React from "react";
import logo from "./img/hm-logo-800x800.png"

function Landing(props) {
    const { btnCallback } = props;

    return (
        <dic>
            <div className="Landing">
                <div className="left-column">
                    <img className="landing-logo" src={logo} alt={"H&M Logo"}></img>
                </div>
                <div className="right-column">
                    <h1>Welcome!</h1>
                    <p>Place your items on the scanner</p>
                </div>
            </div>
            <div className="exit-div" onClick={btnCallback}>
            </div>
        </dic>
    )
}

export default Landing;


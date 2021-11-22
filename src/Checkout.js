import React from "react";
var QRCode = require("qrcode.react")

const baseURL = "https://example.com"

function Checkout(props) {
    const {items, btnCallback} = props;

    const createURL = () => {
        if (items) {
            return `${baseURL}?items=[${items.join()}]`.replaceAll(" ", "");
        } else {
            return baseURL;
        }
    };
    
    const getQRCode = () => {
        console.log("Creating URL:", createURL());
        return (
            <QRCode value={createURL()} />
        )
    };
    
    return(
        <div className="Checkout">
            <div>{getQRCode()}</div>
            <button onClick={btnCallback}>Proceed</button>
        </div>
    )
}

export default Checkout;
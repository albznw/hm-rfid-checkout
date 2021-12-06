import React from "react";
import logo from "./img/hm-logo-800x800-black.png"
var QRCode = require("qrcode.react")

const baseURL = "https://deviswac.z22.web.core.windows.net"

function Checkout(props) {
    const { items, btnCallback } = props;

    const createURL = () => {
        if (items) {
            return `${baseURL}/?items=[${items.join()}]`.replaceAll(" ", "");
        } else {
            return baseURL;
        }
    };

    const getQRCode = () => {
        console.log("Creating URL:", createURL());
        return (
            <QRCode
                size={200}
                level="M"
                value={createURL()}
                imageSettings={{
                    src: logo,
                    excavate: true,
                    width: 50,
                    height: 50,
                }}
            />
        )
    };

    return (
        <div className="Checkout">
            <div className="wrapper-checkout">
                <div className="left-checkout">
                    <h2>Checkout</h2>
                    <p>Please proceed to payment by scanning the QR code.</p>
                </div>
                <div className="right-checkout">
                    <div className="qr-code">{getQRCode()}</div>
                </div>
            </div>
            <div className="wrapper-btn-checkout">
                <button onClick={btnCallback}>
                    Proceed <span className="arrow">&rarr;</span>
                </button>
            </div>
        </div>
    )
}

export default Checkout;
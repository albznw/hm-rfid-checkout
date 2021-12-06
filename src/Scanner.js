import { random } from "lodash";
import React from "react";

function Scanner(props) {
    const { items, btnCallback } = props;
    console.log("Items in basket:", items);

    const getItems = items.map((data) => {
        return (
            <div className="item-row">
                <div className="item-name">
                    <p>09827364723425</p>
                </div>
                <div className="item-price">
                    <p>{random(400)} kr</p>
                </div>
            </div>
        )
    });

    return (
        <div className="Scanner">
            <div className="head-row">
                <h2>Scanned items</h2>
            </div>
            <div className="main-row">
                {getItems}
            </div>
            <div className="bot-row">
                <div className="number-of-items">
                    <p>Number of items: {items.length}</p>
                </div>
                <div className="scanner-btn">
                    <button onClick={btnCallback} className="btn-border">
                        CHECKOUT <span className="arrow">&rarr;</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Scanner;

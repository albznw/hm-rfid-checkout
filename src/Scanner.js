import React from "react";

function Scanner(props) {
    const {items, btnCallback} = props;

    console.log(items);

    const getItems = items.map((data) => {
        return(
            <p>{data}</p>
        )
    });

    return(
        <div className="Scanner">
            <div className="left">
                <p>Scanned items</p>
                <div className="center-wrapper">
                    {getItems}
                </div>
            </div>
            <div className="right">
                <div className="center-wrapper">
                    <p>Scanned items:</p>
                    <p>{items.length}</p>
                </div>
            </div>
            <button onClick={btnCallback}>Proceed to checkout</button>
        </div>
    )
}

export default Scanner;


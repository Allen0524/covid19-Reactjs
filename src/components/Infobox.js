import React from 'react'
import './Infobox.css';

function Infobox({title, number, total}) {
    return (
        <div className="infobox">
            <h4>{title}</h4>
            <h1>{number}</h1>
            <h5>{total} total</h5>
        </div>
    )
}

export default Infobox

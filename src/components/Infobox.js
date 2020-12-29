import React from 'react'
import './Infobox.css';
import CountUp from 'react-countup';

function Infobox({title, number, total, active, ...props}) {
    if(number === undefined) {
        return 'Loading...';
    }
    return (
        <div onClick={props.onClick} className={`infobox ${active && "infobox--selected"}`}>
            <h4>{title}</h4>
            <h1>
                <CountUp
                    start={0}
                    end={number}
                    duration={2.5}
                    separator=","
                />
            </h1>
            <h5>
                <CountUp
                    start={0}
                    end={total}
                    duration={2.5}
                    separator=","
                /> <span style={{color: 'lightgray'}}> total</span>
            </h5>
        </div>
    )
}

export default Infobox

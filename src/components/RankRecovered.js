import React from 'react';
import './RankRecovered.css';
import numeral from 'numeral';

export default function RankRecovered({ lists }) {
    return (
        <div className="rankRecovered">
            <div className="recoveredWrap">
                <h1>Recovered</h1>
                {/* <h2>Top 20</h2> */}
            </div>
            <div className="scope">
                {lists != null ? lists.sort((a,b)=>(a.recovered < b.recovered ? 1 : -1))
                .map((item, i)=>(<div key={i} className="deathItem">
                    <h4>{item.country}</h4>
                    <h5 className="deathDigit">{numeral(item.recovered).format('0,0')}
                    <span style={{color: 'gray'}}> recovered</span>
                    </h5></div>)): <h1>null</h1>}
            </div>
        </div>
    )
}

import React from 'react';
import './RankDeath.css'
import numeral from 'numeral';

function RankDeath( {lists} ) {
    return (
        <div className="rankdeath">
            <div className="titleWrap">
                <h1>Deaths</h1>
                {/* <h2>Top 20</h2> */}
            </div>
            <div className="scope">
                {lists != null ? lists.sort((a,b)=>(a.deaths < b.deaths ? 1 : -1))
                .map((item, i)=>(<div key={i} className="deathItem">
                    <h4>{item.country}</h4>
                    <h5 className="deathDigit">{numeral(item.deaths).format('0,0')}
                    <span style={{color: 'gray'}}> deaths</span>
                    </h5></div>)): <h1>null</h1>}
            </div>
        </div>
        // {lists != null ? lists.sort().map((item)=>(<h4>{item.country}</h4>)): <h1>null</h1>}
        
    )
}

export default RankDeath

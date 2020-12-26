import React from 'react';
import './LineGraph.css';
import {Line} from 'react-chartjs-2';
import {useEffect, useState} from 'react';
import axios from 'axios';
import numeral from 'numeral';


const option = {
    scales: {
        xAxes: [
            {
                type:"time",
                time: {
                   parser: "MM/DD/YYYY" 
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    callback: function(value, index) {
                        return numeral(value).format("0 a")
                    }
                }
            }
        ]
    }
}

function LineGraph() {
    const [data, setData] = useState({}); 

    // https://disease.sh/v3/covid-19/historical/all?lastdays=120 (全球4個月的資料)

    useEffect(() => {
        const getData = async ()=>{
            const d = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
            .then(res => res.data);
            const keys = Object.keys(d.cases);
            const values = Object.values(d.cases);
            const tempData = {};
            const f = {};
            const g = [];
            f['data'] = values;
            f['borderColor'] = 'rgb(255,170,0)';
            f['backgroundColor'] = 'rgba(190,170,0,0.5)'
            f['label'] = 'Cases';
            g[0] = f;
            console.log(f)
            tempData['labels'] = keys;
            tempData['datasets'] = g;

            setData(tempData);
            console.log(tempData);
        };
        getData();

    },[]);
        

    return (
        <div className="linegraph">
            <h1>Figure</h1>
            <Line data={data} options={option} />
        </div>
    )
}

export default LineGraph

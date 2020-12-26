import React from 'react';
import './LineGraph.css';
import {Line} from 'react-chartjs-2';
import {useEffect, useState} from 'react';
import axios from 'axios';

function LineGraph() {
    const [data, setData] = useState({});
    

    // https://disease.sh/v3/covid-19/historical/all?lastdays=120 (全球4個月的資料)

    useEffect(() => {
        const getData = async ()=>{
            const d = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(res => res.data);
            const keys = Object.keys(d.cases);
            const values = Object.values(d.cases);
            const tempData = {};
            const f = {};
            const g = [];
            f['data'] = values;
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
            <h1>圖表</h1>
            <Line data={data} />
        </div>
    )
}

export default LineGraph

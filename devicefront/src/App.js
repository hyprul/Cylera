import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            chartData: {},
            serverData: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        label: "From Server",
                        borderColor: "#3e95cd",
                        fill: false
                    },
                    {
                        data: [],
                        label: "To Server",
                        borderColor: "#c45850",
                        fill: false
                    }
                ]
            }
        };
    }

    componentWillMount() {
        this.getChartData();
        // fetch('http://localhost:5000/api/devices/cf4844bc-a107-4e0a-84e1-fa04d76d388c')
        //     .then(response => response.json())
        //     .then(data => this.processData(data))
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/devices/cf4844bc-a107-4e0a-84e1-fa04d76d388c')
            .then(response => response.json())
            .then(data => this.processData(data))
    }

    processData(dataArray) {
        let fromserver = [];
        let toserver = [];
        let timestamps = [];
        //console.log(dataArray)
        for (let i = 0; i < dataArray.length; i++) {
            //console.log("bytes_fs " + dataArray[i]['bytes_fs'] + " bytes_ts " + dataArray[i]['bytes_ts'] + " timestamp: " + dataArray[i]['timestamp'])
            fromserver.push(dataArray[i]['bytes_fs']);
            toserver.push(dataArray[i]['bytes_ts']);
            timestamps.push(dataArray[i]['timestamp']);
        }
        // console.log(fromserver);
        // console.log(toserver);
        // console.log(timestamps);

        this.setState({
            serverData:
            {
                labels: timestamps,
                datasets: [
                    {
                        data: fromserver,
                        label: "From Server",
                        borderColor: "#3e95cd",
                        fill: false
                    },
                    {
                        data: toserver,
                        label: "To Server",
                        borderColor: "#c45850",
                        fill: false
                    }
                ]
            }
        })

        console.log(this.state.serverData)
    }

    getChartData() {
        //Ajax Calls Here
        this.setState({
            chartData:
            {
                labels: ['Bangkok', 'Nonthaburi', 'Nakhon Ratchasima', 'Chiang Mai', 'Hat Yai'],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            565547, 270609, 174332, 174235, 157467
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ]
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div className="App">
                <Chart chartData={this.state.chartData} serverData={this.state.serverData} location="HNNGGHHH" legendPosition="bottom" />
            </div>
        );
    }

}

export default App;


// new Chart(document.getElementById("line-chart"), {
//     type: 'line',
//     data: {
//       labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
//       datasets: [{ 
//           data: [86,114,106,106,107,111,133,221,783,2478],
//           label: "Africa",
//           borderColor: "#3e95cd",
//           fill: false
//         }, { 
//           data: [282,350,411,502,635,809,947,1402,3700,5267],
//           label: "Asia",
//           borderColor: "#8e5ea2",
//           fill: false
//         }, { 
//           data: [168,170,178,190,203,276,408,547,675,734],
//           label: "Europe",
//           borderColor: "#3cba9f",
//           fill: false
//         }, { 
//           data: [40,20,10,16,24,38,74,167,508,784],
//           label: "Latin America",
//           borderColor: "#e8c3b9",
//           fill: false
//         }, { 
//           data: [6,3,2,2,7,26,82,172,312,433],
//           label: "North America",
//           borderColor: "#c45850",
//           fill: false
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: true,
//         text: 'World population per region (in millions)'
//       }
//     }
//   });
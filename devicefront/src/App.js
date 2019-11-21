import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
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
            },

            deviceData: {
                device_uuid: 'cf4844bc-a107-4e0a-84e1-fa04d76d388c',
                end_time: 1600000000, 
                window_time: 60,
                num_windows: 10
            }
        };
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/devices/${this.state.deviceData.device_uuid}`)
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


    render() {
        return (
            <div className="App">
                <Chart serverData={this.state.serverData} device={this.state.deviceData.device_uuid} legendPosition="bottom" />
            </div>
        );
    }

}

export default App;
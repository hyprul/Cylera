import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
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

    getData(device_uuid, end_time, window_time, num_windows) {
        let url = `http://localhost:5000/api/devices/${device_uuid}?end_time=${end_time}&window_time=${window_time}&num_windows=${num_windows}`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.processData(data))
    }

    componentDidMount() {
        this.getData(this.state.deviceData.device_uuid, this.state.deviceData.end_time, this.state.deviceData.window_time, this.state.deviceData.num_windows);
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = new FormData(event.target);
        let values = []
        for (let value of data.values()) {
            values.push(value)
        }

        this.setState({
            deviceData: {
                device_uuid: values[0],
                end_time: 1600000000,
                window_time: 60,
                num_windows: 10
            }
        })

        this.getData(values[0], 1600000000, 60, 10)
        console.log("Finished getting data")
        console.log(this.state.deviceData)
        // this.getData();



        // console.log(values)
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

        console.log("Finished proessing data")
        //console.log(this.state.serverData)
    }


    render() {
        return (
            <div className="App" >
                <div className="Chart" style={{ marginLeft: '45px', marginRight: '45px', width: '90%' }}>
                    <Chart serverData={this.state.serverData} device={this.state.deviceData.device_uuid} legendPosition="bottom" />
                </div>

                <div className="Form">
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="device_uuid">Enter Device UUID</label>
                        <input id="device_uuid" name="device_uuid" type="text" required />

                        <label htmlFor="end_time">End Time</label>
                        <input id="end_time" name="end_time" type="number" />

                        <label htmlFor="window_time">Window Time</label>
                        <input id="window_time" name="window_time" type="number" />

                        <label htmlFor="num_windows">Number Windows</label>
                        <input id="num_windows" name="num_windows" type="number" />

                        <button>Request data!</button>

                    </form>

                </div>

            </div >
        );
    }

}

export default App;
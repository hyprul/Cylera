import React, { Component } from 'react';
import Chart from './components/Chart';
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';
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
        fetch(`http://localhost:5000/api/devices/${this.state.deviceData.device_uuid}?end_time=${this.state.deviceData.end_time}&window_time=${this.state.deviceData.window_time}&num_windows=${this.state.deviceData.num_windows}`)
            .then(response => response.json())
            .then(data => this.processData(data))
    }

    resetThenSet = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]));
        temp.forEach(item => item.selected = false);
        temp[id].selected = true;
        this.setState({
            [key]: temp
        });
    }

    toggleSelected = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]));
        temp[id].selected = !temp[id].selected;
        this.setState({
            [key]: temp
        });
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
            <div className="App" >
                <div className="Chart" style={{ marginLeft: '45px', marginRight: '45px', width: '90%' }}>
                    <Chart serverData={this.state.serverData} device={this.state.deviceData.device_uuid} legendPosition="bottom" />
            </div>

            </div >
        );
    }

}

export default App;
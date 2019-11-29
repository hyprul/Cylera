import React, { Component } from 'react';
import Chart from './components/Chart';
import DeviceForm from './components/DeviceForm'
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

        console.log(values)
        this.getData(values[0], values[1], values[2], values[3])

        this.setState({
            deviceData: {
                device_uuid: values[0],
                end_time: values[1],
                window_time: values[2],
                num_windows: values[3]
            }
        })
        //console.log("Finished getting data")
        //console.log(this.state.deviceData)
        // this.getData();

        // console.log(values)
    }

    processData(dataArray) {
        let fromserver = [];
        let toserver = [];
        let timestamps = [];
        //console.log(dataArray)


        // for (let i = 0; i < dataArray.length; i++) {
        //     //console.log("bytes_fs " + dataArray[i]['bytes_fs'] + " bytes_ts " + dataArray[i]['bytes_ts'] + " timestamp: " + dataArray[i]['timestamp'])
        //     fromserver.push(dataArray[i]['bytes_fs']);
        //     toserver.push(dataArray[i]['bytes_ts']);
        //     timestamps.push(dataArray[i]['timestamp']);
        // }

        //Chunking Data into num_windows
        const chunked_data = [];
        let index = 0;
        let size = Math.trunc(dataArray.length / this.state.deviceData.num_windows);
        //console.log(size)
        while (index < dataArray.length) {
            chunked_data.push(dataArray.slice(index, size + index));
            //console.log(chunked_data)
            index += size;
        }

        //Summing data and pushing
        for (let i = 0; i < chunked_data.length; i++) {
            let sumfs = 0, sumts = 0, finaltimestamp = 0;

            for (let j = 0; j < chunked_data[i].length; j++) {
                if (j === chunked_data[i].length - 1) {
                    finaltimestamp = chunked_data[i][j].timestamp;
                    if (finaltimestamp <= this.state.deviceData.end_time)
                        timestamps.push(finaltimestamp)
                }
                sumfs += chunked_data[i][j].bytes_fs;
                sumts += chunked_data[i][j].bytes_ts;
            }

            fromserver.push(sumfs);
            toserver.push(sumts);

        }

        //console.log(chunked_data)

        //console.log(chunked_data)

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

        //console.log("Finished proessing data")
        //console.log(this.state.serverData)
    }


    render() {
        return (
            <div className="App" >
                <div className="Chart" style={{ marginLeft: '45px', marginRight: '45px', width: '90%' }}>
                    <Chart serverData={this.state.serverData} device={this.state.deviceData.device_uuid} legendPosition="bottom" />
                </div>

                <div className="Form">
                    <DeviceForm handleSubmit={this.handleSubmit} />
                </div>

            </div>
        );
    }

}

export default App;
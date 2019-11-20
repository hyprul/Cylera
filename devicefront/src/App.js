import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            chartData: {}
        };
    }

    componentWillMount() {
        this.getChartData();
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/devices/cf4844bc-a107-4e0a-84e1-fa04d76d388c')
            .then(response => response.json())
            .then(data => console.log(data))
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
                <Chart chartData={this.state.chartData} location="HNNGGHHH" legendPosition="bottom" />
            </div>
        );
    }

}

export default App;

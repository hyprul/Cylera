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
                <Chart chartData={this.state.chartData} legendPosition="bottom" />
            </div>
        );
    }

}

export default App;

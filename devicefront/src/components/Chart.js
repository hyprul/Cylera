import React, { Component } from 'react';

import { Bar, Line, Pie } from 'react-chartjs-2';

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverData: props.serverData
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ serverData: newProps.serverData });
    }

    shouldComponentUpdate(newProps) {
        return this.state.serverData !== newProps.serverData;
    }

    // static defaultProps = {
    //     displayTitle: true,
    //     // displayLegend: true,
    //     // legendPosition: 'right',
    //     // location: 'City'
    // }

    render() {
        return (
            <div className="chart">
                <Line
                    data={this.state.serverData}
                    options={{
                        title: {
                            display: true,
                            text: 'Server Data'
                        }
                    }}
                />
            </div>
        )
    }
}
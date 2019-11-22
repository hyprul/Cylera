import React from 'react';
import { Line } from 'react-chartjs-2';

export default function Chart(props) {
    return (
        <div className="chart">
            <Line
                data={props.serverData}
                options={{
                    title: {
                        display: true,
                        text: `Server Data for Device UUID: ${props.device}`,
                    }
                }}
            />
        </div>
    )
}

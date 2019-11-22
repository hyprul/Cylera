import React from 'react';

export default function DeviceForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>

            <label htmlFor="device_uuid">Choose Device UUID</label>
            <input list="device_uuids" id="device_uuid" name="device_uuid" required />

            <datalist id="device_uuids">
                <option value="d75c54d3-e672-4580-8bd1-b39ea9c66e93" />
                <option value="25bb84c5-09d8-48ce-9833-40f25135c375" />
                <option value="786b2b79-047a-4f48-9224-f05cae59a453" />
                <option value="6a58ed21-2311-4149-b1b8-6fb82655cb14" />
                <option value="3ff2c859-5664-4d13-9e7f-4cb6f64ed281" />
            </datalist>



            <label htmlFor="end_time" defaultValue='1600000000'>End Time</label>
            <input id="end_time" name="end_time" type="number" />

            <label htmlFor="window_time" defaultValue='60'>Window Time</label>
            <input id="window_time" name="window_time" type="number" />

            <label htmlFor="num_windows" defaultValue='10'>Number Windows</label>
            <input id="num_windows" name="num_windows" type="number" />

            <button>Request data!</button>

        </form>
    )
}
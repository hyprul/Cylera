import React from 'react'
import Device from './Device'

export default function DeviceList(props) {
    return (
        <div>
            {props.devicelist.map(device => 
                <Device device_uuid={device}  />

            )}
            {/* <h1>Temp</h1>

            {console.log(props.devicelist)}

            {props.devicelist.length > 0 ?  <h1>{pr: null} */}
        </div>
    )
}

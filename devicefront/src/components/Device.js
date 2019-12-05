import React from 'react'




export default function Device(props) {

    return (
        <div>
            {/* <h1></h1> */}
            <a onClick={console.log("hello")}> {props.device_uuid} </a>
        </div>
    )
}
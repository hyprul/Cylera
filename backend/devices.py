# from datetime import datetime
from bandwidths import BANDWIDTHS
import json
import copy
import time

# def get_timestamp():
#     return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

test_device_id = "cf4844bc-a107-4e0a-84e1-fa04d76d388c"
# print(time.time())


# Turns BANDWIDTHS data into dictionary sorted by device_id
DEVICES_HASH = {}

for device in BANDWIDTHS:

    device_id = device["device_id"]

    if not device_id in DEVICES_HASH:
        DEVICES_HASH[device_id] = []

    device_data = {}

    for k in device.keys():
        if k == "device_id":
            continue
        device_data[k] = device[k]

    DEVICES_HASH[device_id].append(device_data)

    # print(DEVICES_HASH[device['device_id']])


# print(DEVICES_HASH[test_device_id])

# print(DEVICES_HASH[device_id])
# print(DEVICES_HASH.keys())
# print(DEVICES_HASH)

# print(list(DEVICES_HASH.items())[0])
# Data to serve with our API
# PEOPLE = {
#     "Farrell": {
#         "fname": "Doug",
#         "lname": "Farrell",
#         "timestamp": get_timestamp()
#     },
#     "Brockman": {
#         "fname": "Kent",
#         "lname": "Brockman",
#         "timestamp": get_timestamp()
#     },
#     "Easter": {
#         "fname": "Bunny",
#         "lname": "Easter",
#         "timestamp": get_timestamp()
#     }
# }

# Create a handler for our read (GET) devices
def read():
    """
    This function responds to a request for /api/people
    with the complete lists of people

    :return:        sorted list of people
    """
    # Create the list of devices from our data
    # return [DEVICES_HASH[key] for key in DEVICES_HASH.keys()]
    # print(DEVICES_HASH.keys())
    # return json.dumps(DEVICES_HASH)
    print(len(DEVICES_HASH.keys()))
    return list(DEVICES_HASH.keys())


def getdevice(device_uuid, end_time, window_time, num_windows):
    print(
        "Device UUID: "
        + device_uuid
        + "; end_time: "
        + str(end_time)
        + "; window_time: "
        + str(window_time)
        + "; num_windows: "
        + str(num_windows)
    )
    # print(len(DEVICES_HASH[device_uuid]))
    return DEVICES_HASH[device_uuid]

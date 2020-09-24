const identifierList = [
    {
        label: '温度',
        value: 'temperature'
    },
    {
        label: '湿度',
        value: 'humidity'
    }
    // {
    //     label: '电量',
    //     value: 'battery'
    // }
];

const iconWidth = 18;
const iconHeight = 18;
const circleRadius = 11;


const functionSpaceList = [
    {
        // id: 'g67828',
        id: 'g20',
        label: '冷藏区',
        status: 'error',
        type: 'temperature',
        deviceId: '9Q@40583E34',
        deviceName: '0号传感器',
        temperature: 40
    },
    // {
    //     id: 'g67828',
    //     // id: 'g20',
    //     label: '冷藏区',
    //     status: 'error',
    //     type: 'temperature',
    // deviceId: '1JFR940583E34',
    //     deviceName: '1号传感器',
    //     temperature: 40
    // },
    {
        id: 'g70816',
        label: '冷冻区',
        type: 'humidity',
        status: 'offline',
        deviceId: '940583E34',
        deviceName: '2号传感器',
        humidity: 10
    },
    {
        id: 'g67780',
        label: '常温区',
        status: 'normal',
        type: 'tempHumidity',
        deviceId: 'UT940583E34',
        deviceName: '3号传感器',
        humidity: 10,
        temperature: 20
    }
];

const colorPicker = {
    offline: '#828282',
    normal: '#00BB53',
    error: '#FF4848'
};

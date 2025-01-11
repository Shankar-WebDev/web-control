import React from 'react';
import { CdrWriter, CdrReader } from '@foxglove/cdr';

// ROS2 Kill type
class Kill {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    encode(cdrWriter: CdrWriter) {
        cdrWriter.string(this.name);
    }
}

class NodeLauncher {
    node: string;
    action: number;

    constructor(node: string, action: number) {
        this.node = node;
        this.action = action;
    }

    encode(cdrWriter: CdrWriter) {
        cdrWriter.string(this.node);
        cdrWriter.int16(this.action);
    }
}

//class GoalPose {
  //  type: string;

//    constructor(type: string) {
  //      this.type = type;
//    }

  //  encode(cdrWriter: CdrWriter) {
    //    cdrWriter.string(this.type);
 //   }
//}


class AddTwoInts {
    a: bigint; // Using bigint for Int64 representation
    b: bigint;



    constructor(a: bigint, b: bigint) {
        this.a = a;
        this.b = b;
    }

    encode(cdrWriter: CdrWriter) {
        cdrWriter.int64(this.a);
        cdrWriter.int64(this.b);
    }
}



// class AddTwoIntsResponse {
//     sum: number;

//     constructor() {
//         this.sum = 0;
//     }

//     decode(cdrReader: CdrReader, encodedValue: any) {


//     }
// }

const ServiceCaller: React.FC = () => {


    // const BASE_URL = 'http://localhost:9091'; // Change this base URL as needed
    const BASE_URL = '/zenoh-router-server'; // Change this base URL as needed


    const killPayload = (name: string) => {
        const kill = new Kill(name);
        const writer = new CdrWriter();
        kill.encode(writer);
        return writer.data; // Return the encoded data
    };

    const nodeLauncherPayload = (node: string, action: number) => {
        const nodePayload = new NodeLauncher(node, action);
        const writer = new CdrWriter();
        nodePayload.encode(writer);
        return writer.data; // Return the encoded data
    };

    //const goalPayload = (type: string) => {
      //  const goal = new GoalPose(type);
     //   const writer = new CdrWriter();
     //   goal.encode(writer);
     //   return writer.data; // Return the encoded data
    //};

    const addTwoIntsPayload = (a: bigint, b: bigint) => {
        const addTwoInts = new AddTwoInts(a, b);
        const writer = new CdrWriter();
        addTwoInts.encode(writer);
        return writer.data;
    }

    // Define button data with endpoint and payload
    const buttons = [


        { name: 'Clear', endpoint: `${BASE_URL}/clear`, payload: null },
        { name: 'Reset', endpoint: `${BASE_URL}/reset`, payload: null },
        { name: 'Kill', endpoint: `${BASE_URL}/kill`, payload: killPayload('turtle1') },

        { name: 'Start System', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('start', 1) },
        { name: 'Stop System', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('start', 0) },
        { name: 'Start motor', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('motor', 1) },
        { name: 'Stop motor', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('motor', 0) },
        { name: 'Initiate Teleop', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('teleop', 1) },
        { name: 'Stop Teleop', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('teleop', 0) },
        { name: 'Start Mapping', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('map', 1) },
        { name: 'Stop Mapping', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('map', 0) },
        { name: 'Start Navigation', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('nav', 1) },
        { name: 'Stop Navigation', endpoint: `${BASE_URL}/nodelauncher`, payload: nodeLauncherPayload('nav', 0) },

        // { name: 'Localize at Pose', endpoint: `${BASE_URL}/pose_setting`, payload: goalPayload('amcl') },
        // { name: 'Go to Pose', endpoint: `${BASE_URL}/pose_setting`, payload: goalPayload('goal') },



        { name: 'add 2+5', endpoint: `${BASE_URL}/add_two_ints`, payload: addTwoIntsPayload(BigInt(2), BigInt(5)) },
        { name: 'add 4+8', endpoint: `${BASE_URL}/add_two_ints`, payload: addTwoIntsPayload(BigInt(4), BigInt(8)) },
        { name: 'add 290+5', endpoint: `${BASE_URL}/add_two_ints`, payload: addTwoIntsPayload(BigInt(290), BigInt(5)) },
        { name: 'add 400+8', endpoint: `${BASE_URL}/add_two_ints`, payload: addTwoIntsPayload(BigInt(400), BigInt(8)) },
        { name: 'add 8002+5', endpoint: `${BASE_URL}/add_two_ints`, payload: addTwoIntsPayload(BigInt(8002), BigInt(5)) },
        { name: 'add 480+8', endpoint: `${BASE_URL}/add_two_ints`, payload: addTwoIntsPayload(BigInt(480), BigInt(8)) },

    ];




    // Function to convert octet string to Uint8Array
    const convertOctetToUint8Array = (octetString: string) => {
        // Convert the octet string to binary
        const binaryString = atob(octetString); // Decode the Base64-encoded string
        const len = binaryString.length;

        // Create a Uint8Array
        const uint8Array = new Uint8Array(len);

        // Fill the Uint8Array with binary data
        for (let i = 0; i < len; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }

        return uint8Array;
    };



    // Function to handle button click
    const handleRequest = (endpoint: string, payload: any) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint, true);
        console.log("endpoint sending to is ", endpoint);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Payload sent:', payload, 'to', endpoint);
                console.log('Response received:', xhr.responseText);
                // Parse the JSON response
                const response = JSON.parse(xhr.responseText);
                // Assuming response is an array and extracting the first element
                if (response.length > 0) {
                    const { key, value } = response[0]; // Destructure to get key and value
                    handleResponse(key, value); // Call the handler function
                }
            } else {
                console.error('Error making POST request:', xhr.statusText);
            }
        };

        xhr.onerror = () => {
            console.error('Request failed');
        };

        xhr.send(payload); // Send the payload
    };


    // Function to handle button click
    const handleResponse = (key: string, value: any) => {
        console.log('key', key);
        console.log('value', value);

        if (key === 'add_two_ints') {
            console.log(new CdrReader(convertOctetToUint8Array(value)).int64(), ' <-- this is the result')
        }

        if (key === 'nodelauncher') {
            const response = new CdrReader(convertOctetToUint8Array(value)).int16();
            console.log(response, ' <-- this is the result of node launcher')

            if (response === 1) {
                console.log('successfully performed node initiation')
            }

        }

        if (key === 'nodeFeedback') {
            console.log('update the code')
        }


    };

    return (
        <div className="bg-white shadow-md rounded-lg mb-4">
            <header className="bg-blue-500 text-white p-4">
                <h5 id="panel_label" className="text-lg font-semibold m-0">Action Panel</h5>
            </header>
            <div className="p-4 grid grid-cols-2 gap-2 bg-gray-200" >
                {buttons.map((button) => (
                    <button
                        key={button.name}
                        onClick={() => handleRequest(button.endpoint, button.payload)}
                        className="text-xl flex items-center justify-center bg-gray-300 hover:bg-gray-100 rounded border border-gray-500"
                        style={{ gridColumn: 'span 1', gridRow: 'span 1' }}
                    >
                        {button.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ServiceCaller;

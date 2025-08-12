import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
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

// Helper function to encode the payload for ROS service calls

const encodePayload = (type: string, data: any) => {
  const writer = new CdrWriter();
  if (type === 'kill') {
    const kill = new Kill(data.name);
    kill.encode(writer);
  } else if (type === 'nodelauncher') {
    const nodeLauncher = new NodeLauncher(data.node, data.action);
    nodeLauncher.encode(writer);
  } else if (type === 'add_two_ints') {
    const addTwoInts = new AddTwoInts(data.a, data.b);
    // console.log(data.a, data.b)
    addTwoInts.encode(writer);
  }
  return writer.data;
};

// const addTwoIntsPayload = (a: bigint, b: bigint) => {
//   const addTwoInts = new AddTwoInts(a, b);
//   const writer = new CdrWriter();
//   addTwoInts.encode(writer);
//   return writer.data;
// };

// ROS Service WebSocket Component
const RosServiceWebSocket: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<string>();
  const [socket, setSocket] = useState<any>(null);

  // Setup WebSocket connection and listeners
  useEffect(() => {
    const newSocket = io('http://localhost:4500'); // Adjust WebSocket URL

    setSocket(newSocket);
  

    newSocket.on('connection', () => {
      setStatus('Connected');
      console.log('Connected to WebSocket server');
    });

    newSocket.on('disconnect', () => {
      setStatus('Disconnected');
      console.log('Disconnected from WebSocket server');
    });

    // Listen for responses from the ROS backend
    newSocket.on('ros_response', (data) => {
      console.log('Received data from ROS backend:', data);
      handleResponse(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle response from the backend
  const handleResponse = (data: any) => {
    console.log('from the handle response', data);
    if (data.result[0].key === 'add_two_ints') {
      // console.log('from the if');
      const sum = new CdrReader(convertOctetToUint8Array(data.result[0].value)).int64();
      console.log(`Result from adding integers: ${sum}`);
      setLogs((prevLogs) => [`Add Two Ints Result: ${sum}`, ...prevLogs]);
    } else if (data.result[0].key === 'nodelauncher') {
      const result = new CdrReader(
        convertOctetToUint8Array(data.result[0].value)
      ).int16();
      console.log( `Node Launcher Response: ${result === 1 ? 'Success' : 'Failure'}`)
      setLogs((prevLogs) => [
        `Node Launcher Response: ${result === 1 ? 'Success' : 'Failure'}`,
        ...prevLogs,
      ]);
    }
    // Handle other responses based on your ROS service names
  };

  // Convert Base64 encoded octet string to Uint8Array
  const convertOctetToUint8Array = (octetString: string) => {
    const binaryString = atob(octetString);
    const len = binaryString.length;
    const uint8Array = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
  };

  // Function to handle button click and send data to WebSocket
  const handleRequest = (serviceType: string, data: any) => {
    if (socket && socket.connected) {
      const encodedPayload = encodePayload(serviceType, data);
      console.log('Sending:', { serviceType, data: encodedPayload });

      socket.emit('ros_request', {
        service: serviceType,
        data: encodedPayload,
      });
      console.log(`Sent ${serviceType} request with payload`, encodedPayload);
    } else {
      console.error('Socket is not connected!');
    }
  };

  return (
    <div className="container">
      <h1>ROS Service WebSocket Interface</h1>
      <p>Status: {status}</p>

      <div className="action-buttons m-10 border">
        <button onClick={() => handleRequest('kill', { name: 'turtle1' })}>
          Kill Node
        </button>
        <button
          className="border-2 "
          onClick={() =>
            handleRequest('nodelauncher', { node: 'motor', action: 1 })
          }>
          Start Motor
        </button>
        <button
          className="border-2 "
          onClick={() =>
            handleRequest('nodelauncher', { node: 'motor', action: 0 })
          }>
          Stop Motor
        </button>
        <button
          className="border-2 "
          onClick={() =>
            handleRequest('add_two_ints', { a: BigInt(10), b: BigInt(20) })
          }>
          add
        </button>
      </div>

      <div className="logs">
        <h2>Logs</h2>
        <pre>{logs.join('\n')}</pre>
      </div>
    </div>
  );
};

export default RosServiceWebSocket;

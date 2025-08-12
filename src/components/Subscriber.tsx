import { CdrReader, CdrWriter } from '@foxglove/cdr';
import { useState, useEffect } from 'react';

// ROS2 Vector3 type
class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  encode(cdrWriter: CdrWriter) {
    cdrWriter.float64(this.x);
    cdrWriter.float64(this.y);
    cdrWriter.float64(this.z);
  }

  static decode(cdrReader: CdrReader): Vector3 {
    const x = cdrReader.float64();
    const y = cdrReader.float64();
    const z = cdrReader.float64();
    return new Vector3(x, y, z);
  }
}

// ROS2 Twist type
class Twist {
  linear: Vector3;
  angular: Vector3;

  constructor(linear: Vector3, angular: Vector3) {
    this.linear = linear;
    this.angular = angular;
  }

  encode(cdrWriter: CdrWriter) {
    this.linear.encode(cdrWriter);
    this.angular.encode(cdrWriter);
  }

  static decode(cdrReader: CdrReader): Twist {
    const linear = Vector3.decode(cdrReader);
    const angular = Vector3.decode(cdrReader);
    return new Twist(linear, angular);
  }
}

const Subscriber: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const restApi: string = 'http://localhost:9999/'; // Replace with your API URL
  const subScope: string = ''; // Replace with your subscription scope
  const TOPIC_MAP: string = 'cmd_vel'; // Replace with your logs topic
  const keyExpr: string = subScope + TOPIC_MAP;

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
  useEffect(() => {
    if (typeof EventSource !== 'undefined') {
      console.log('Subscribe to EventSource: ' + restApi + keyExpr);
      const source = new EventSource(restApi + keyExpr);

      source.addEventListener(
        'PUT',
        (e: MessageEvent) => {
          console.log('Received sample: ' + e.data);
          const sample = JSON.parse(e.data);
          const reader = new CdrReader(convertOctetToUint8Array(sample.value)); // Adjust based on your data format
          console.log(sample.value, 'this is the sample value');
          const log = Twist.decode(reader);
          console.log(log, 'the log');

          //         // Prepare formatted log message
          //   const formattedLog = log.status.diagnosticStatuses
          //   .map((status) => {
          //     const keyValueStrings = status.values.keyValues
          //       .map((kv) => `${kv.key}: ${kv.value}`)
          //       .join(', ');

          //     return `[${status.level}] ${status.name} - ${status.message} (${status.hardware_id})\nValues: ${keyValueStrings}`;
          //   })
          //   .join('\n\n');

          // // Update logs state, keeping only the last 10 logs
          // setLogs((prevLogs) => {
          //     const updatedLogs = [formattedLog, ...prevLogs]; // Add new log at the top
          //     return updatedLogs.slice(0, 10); // Keep only the last 10 logs
          // });
        },
        false
      );

      return () => {
        source.close();
      };
    } else {
      setLogs(['Sorry, your browser does not support server-sent events...']);
    }
  }, [restApi, keyExpr]);

  return (
    <div className="flex  justify-center items-center h-screen">
      <button className="w-100 h-100 bg-blue-600 p-10 m-10">
        send payload
      </button>
    </div>
  );
};

export default Subscriber;

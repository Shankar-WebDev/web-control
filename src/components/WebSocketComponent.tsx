import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { CdrReader } from '@foxglove/cdr';

class Time {
  sec: number;
  nanosec: number;

  constructor(sec: number, nanosec: number) {
    this.sec = sec;
    this.nanosec = nanosec;
  }

  static decode(cdrReader: CdrReader): Time {
    const sec = cdrReader.int32();
    const nanosec = cdrReader.uint32();
    return new Time(sec, nanosec);
  }
}

class Header {
  stamp: Time;
  frame_id: string;

  constructor(stamp: Time, frame_id: string) {
    this.stamp = stamp;
    this.frame_id = frame_id;
  }

  static decode(cdrReader: CdrReader): Header {
    const stamp = Time.decode(cdrReader);
    const frame_id = cdrReader.string();

    return new Header(stamp, frame_id);
  }
}

// class Point {
//     x: number;
//     y: number;
//     z: number;

//     constructor(
//         x: number,
//         y: number,
//         z: number
//     ) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//     }

//     static decode(cdrReader: CdrReader): Point {
//         const x = cdrReader.float64();
//         const y = cdrReader.float64();
//         const z = cdrReader.float64();

//         return new Point(x, y, z);
//     }
// }

// class Quarternion {
//     x: number;
//     y: number;
//     z: number;
//     w: number;

//     constructor(
//         x: number,
//         y: number,
//         z: number,
//         w: number
//     ) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//         this.w = w;
//     }

//     static decode(cdrReader: CdrReader): Quarternion {
//         const x = cdrReader.float64();
//         const y = cdrReader.float64();
//         const z = cdrReader.float64();
//         const w = cdrReader.float64();

//         return new Quarternion(x, y, z, w);
//     }
// }

// class Pose {
//     position: Point;
//     orientation: Quarternion;

//     constructor(
//         position: Point,
//         orientation: Quarternion
//     ) {
//         this.position = position;
//         this.orientation = orientation;
//     }

//     static decode(cdrReader: CdrReader): Pose {
//         const position = Point.decode(cdrReader);
//         const orientation = Quarternion.decode(cdrReader);

//         return new Pose(position, orientation);
//     }

// }

// class MapMetaData {
//     map_load_time: Time;
//     resolution: number;
//     width: number;
//     height: number;
//     origin: Pose;

//     constructor(map_load_time: Time,
//         resolution: number,
//         width: number,
//         height: number,
//         origin: Pose) {
//         this.map_load_time = map_load_time;
//         this.resolution = resolution;
//         this.width = width;
//         this.height = height;
//         this.origin = origin;
//     }

//     static decode(cdrReader: CdrReader): MapMetaData {
//         const map_load_time = Time.decode(cdrReader);
//         const resolution = cdrReader.float32();
//         const width = cdrReader.uint32();
//         const height = cdrReader.uint32();
//         const origin = Pose.decode(cdrReader);

//         return new MapMetaData(map_load_time, resolution, width, height, origin);
//     }
// }

// // ROS2 Log type (received in 'rosout' topic)
// class OccupancyGrid {
//     header: Header;
//     info: MapMetaData;
//     data: Int8Array;

//     constructor(header: Header,
//         info: MapMetaData,
//         data: Int8Array) {

//         this.header = header;
//         this.info = info;
//         this.data = data;
//     }

//     static decode(cdrReader: CdrReader): OccupancyGrid {
//         const header = Header.decode(cdrReader);
//         const info = MapMetaData.decode(cdrReader);
//         const data = cdrReader.int8Array();

//         return new OccupancyGrid(header, info, data);
//     }
// }

//

class KeyValue {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  static decode(cdrReader: CdrReader): KeyValue {
    const key = cdrReader.string();
    const value = cdrReader.string();

    return new KeyValue(key, value);
  }
}

class KeyValueArray {
  keyValues: KeyValue[];

  constructor(keyValues: KeyValue[]) {
    this.keyValues = keyValues;
  }

  static decode(cdrReader: CdrReader): KeyValueArray {
    const keyValuesLength = cdrReader.uint32(); // Read the length of the array
    const keyValues: KeyValue[] = [];

    for (let i = 0; i < keyValuesLength; i++) {
      const keyValue = KeyValue.decode(cdrReader); // Decode each KeyValue object
      keyValues.push(keyValue);
    }

    return new KeyValueArray(keyValues);
  }
}

class DiagnosticStatus {
  // octet OK=0
  // octet WARN=1
  // octet ERROR=2
  // octet STALE=3
  // level

  level: number;
  name: string;
  message: string;
  hardware_id: string;
  values: KeyValueArray;

  constructor(
    level: number,
    name: string,
    message: string,
    hardware_id: string,
    values: KeyValueArray
  ) {
    this.level = level;
    this.name = name;
    this.message = message;
    this.hardware_id = hardware_id;
    this.values = values;
  }

  static decode(cdrReader: CdrReader): DiagnosticStatus {
    const level = cdrReader.int8();
    const name = cdrReader.string();
    const message = cdrReader.string();
    const hardware_id = cdrReader.string();
    const values = KeyValueArray.decode(cdrReader);

    return new DiagnosticStatus(level, name, message, hardware_id, values);
  }
}

class DiagnosticStatusArray {
  diagnosticStatuses: DiagnosticStatus[];

  constructor(diagnosticStatuses: DiagnosticStatus[]) {
    this.diagnosticStatuses = diagnosticStatuses;
  }

  static decode(cdrReader: CdrReader): DiagnosticStatusArray {
    const diagnosticStatusesLength = cdrReader.uint32(); // Read the length of the array
    const diagnosticStatuses: DiagnosticStatus[] = [];

    for (let i = 0; i < diagnosticStatusesLength; i++) {
      const diagnosticStatus = DiagnosticStatus.decode(cdrReader); // Decode each DiagnosticStatus object
      diagnosticStatuses.push(diagnosticStatus);
    }

    return new DiagnosticStatusArray(diagnosticStatuses);
  }
}

class DiagnosticArray {
  header: Header;
  status: DiagnosticStatusArray;

  constructor(header: Header, status: DiagnosticStatusArray) {
    this.header = header;
    this.status = status;
  }

  static decode(cdrReader: CdrReader): DiagnosticArray {
    const header = Header.decode(cdrReader);
    const status = DiagnosticStatusArray.decode(cdrReader);

    return new DiagnosticArray(header, status);
  }
}

const WebSocketComponent = () => {
  // State to store incoming data from WebSocket
  const [logs, setLogs] = useState<string[]>([]);
  const [data, setData] = useState(null);
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
    // Connect to the Socket.IO server
    const socket = io('http://localhost:4500'); // Replace with your backend Socket.IO URL

    // Handle WebSocket connection
    socket.on('connect', () => {
      console.log('Socket.IO connected');
    });

    // Listen for 'eventData' messages from the backend
    socket.on('eventData', (receivedData) => {
      console.log('Received data from server:', receivedData);

      const reader = new CdrReader(
        convertOctetToUint8Array(receivedData.value)
      ); // Adjust based on your data format
      const log = DiagnosticArray.decode(reader);
      console.log(log, 'the log');

      const formattedLog = log.status.diagnosticStatuses
        .map((status) => {
          const keyValueStrings = status.values.keyValues
            .map((kv) => `${kv.key}: ${kv.value}`)
            .join(', ');

          return `[${status.level}] ${status.name} - ${status.message} (${status.hardware_id})\nValues: ${keyValueStrings}`;
        })
        .join('\n\n');

      // Update logs state, keeping only the last 10 logs
      setLogs((prevLogs) => {
        const updatedLogs = [formattedLog, ...prevLogs]; // Add new log at the top
        return updatedLogs.slice(0, 10); // Keep only the last 10 logs
      });
      // Update the state with the received data
      setData(receivedData);
    });

    // Handle WebSocket disconnection
    socket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
    });

    // Optional: Handle WebSocket connection errors
    socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Listener</h1>
      <p>Check the console for incoming messages from Socket.IO.</p>

      {/* Display the received data */}
      {data ? (
        <div>
          <h2>Received Event Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <div
            className="p-4"
            style={{ width: '100%', height: '48em', overflowY: 'auto' }}>
            <div className="flex flex-col gap-2">
              {logs.map((log, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No data received yet.</p>
      )}
    </div>
  );
};

export default WebSocketComponent;

// src/SimpleDriveControl.tsx
import React, { useState } from 'react';
import { CdrWriter } from '@foxglove/cdr';

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
}

const TwistPublisher: React.FC = () => {
    const [linearX, setLinearX] = useState<number>(0.0);
    const [linearY, setLinearY] = useState<number>(0.0);
    const [linearZ, setLinearZ] = useState<number>(0.0);
    const [angularX, setAngularX] = useState<number>(0.0);
    const [angularY, setAngularY] = useState<number>(0.0);
    const [angularZ, setAngularZ] = useState<number>(0.0);
    const [robotRestApiIP, setRestApiIP] = useState<string>("192.168.1.2");
											      
    const pubTwist = () => {
        const linearVector = new Vector3(linearX, linearY, linearZ);
        const angularVector = new Vector3(angularX, angularY, angularZ);
        const twist = new Twist(linearVector, angularVector);

        const writer = new CdrWriter();
        twist.encode(writer);
        const encodedPayload = writer.data;

        // const robotRestApi = 'http://localhost:9091/'; // Replace with your API URL

	const robotRestApi = `http://localhost:9999/`; // Dynamically set API URL

        const scope = ''; // Replace with your scope
        const topicDrive = 'cmd_vel'; // Replace with your topic
        const keyExpr = `${scope}${topicDrive}`;

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', robotRestApi + keyExpr, true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.send(encodedPayload);
        console.log('Published Twist:', twist);
    };

    return (
        <div className="bg-white/10 shadow-md rounded-lg p-4">
            <h5 className="text-lg font-semibold mb-4">Publish Twist Message</h5>

            <div className="mb-4">
                <h6 className="font-medium">restapi</h6>
                <input
                    type="text"
                    placeholder="192.168.1.2"
                    value={robotRestApiIP}
                    onChange={(e) => setRestApiIP(e.target.value)}
                    className="border p-2 mr-2"
                />
	    </div>
	    
            <div className="mb-4">
                <h6 className="font-medium">Linear</h6>
                <input
                    type="number"
                    placeholder="X"
                    value={linearX}
                    onChange={(e) => setLinearX(parseFloat(e.target.value))}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Y"
                    value={linearY}
                    onChange={(e) => setLinearY(parseFloat(e.target.value))}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Z"
                    value={linearZ}
                    onChange={(e) => setLinearZ(parseFloat(e.target.value))}
                    className="border p-2"
                />
            </div>
            <div className="mb-4">
                <h6 className="font-medium">Angular</h6>
                <input
                    type="number"
                    placeholder="X"
                    value={angularX}
                    onChange={(e) => setAngularX(parseFloat(e.target.value))}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Y"
                    value={angularY}
                    onChange={(e) => setAngularY(parseFloat(e.target.value))}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Z"
                    value={angularZ}
                    onChange={(e) => setAngularZ(parseFloat(e.target.value))}
                    className="border p-2"
                />
            </div>
            <button
                onClick={pubTwist}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Publish
            </button>
        </div>
    );
};

export default TwistPublisher;

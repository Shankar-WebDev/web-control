import React, { useEffect, useState } from 'react';
import { CdrReader } from '@foxglove/cdr';

class Time {
    sec: number;
    nsec: number;

    constructor(sec: number, nsec: number) {
        this.sec = sec;
        this.nsec = nsec;
    }

    static decode(cdrReader: CdrReader): Time {
        const sec = cdrReader.int32();
        const nsec = cdrReader.uint32();
        return new Time(sec, nsec);
    }
}

// ROS2 Log type (received in 'rosout' topic)
class Log {
    time: Time;
    level: number;
    name: string;
    msg: string;
    file: string;
    fn: string;
    line: number;

    constructor(time: Time, level: number, name: string, msg: string, file: string, fn: string, line: number) {
        this.time = time;
        this.level = level;
        this.name = name;
        this.msg = msg;
        this.file = file;
        this.fn = fn;
        this.line = line;
    }

    static decode(cdrReader: CdrReader): Log {
        const time = Time.decode(cdrReader);
        const level = cdrReader.uint8();
        const name = cdrReader.string();
        const msg = cdrReader.string();
        const file = cdrReader.string();
        const fn = cdrReader.string();
        const line = cdrReader.uint32();
        return new Log(time, level, name, msg, file, fn, line);
    }
}

const LogSubscriber: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const restApi: string = 'http://localhost:9092/'; // Replace with your API URL
    const subScope: string = ''; // Replace with your subscription scope
    const TOPIC_LOGS: string = 'rosout'; // Replace with your logs topic
    const keyExpr: string = subScope + TOPIC_LOGS;

    useEffect(() => {
        if (typeof EventSource !== 'undefined') {
            console.log('Subscribe to EventSource: ' + restApi + keyExpr);
            const source = new EventSource(restApi + keyExpr);

            source.addEventListener('PUT', (e: MessageEvent) => {
                console.log('Received sample: ' + e.data);
                const sample = JSON.parse(e.data);
                const reader = new CdrReader(sample.value); // Adjust based on your data format
                const log = Log.decode(reader);
                console.log(log, 'the log');

                setLogs((prevLogs) => [
                    ...prevLogs,
                    `[${log.time.sec}.${log.time.nsec}] [${log.name}]: ${log.msg}`
                ]);
            }, false);

            return () => {
                source.close();
            };
        } else {
            setLogs(['Sorry, your browser does not support server-sent events...']);
        }
    }, [restApi, keyExpr]);

    return (
        <div className="bg-red-300/20 shadow-md rounded-lg mb-4">
            <header className="p-4">
                <h5 id="panel_label" className="text-lg font-semibold m-0">Log Panel</h5>
            </header>
            <div className="p-4" style={{ width: '100%', height: '12em', overflowY: 'auto' }}>
                <div className="flex flex-col gap-2">
                    {logs.slice().reverse().map((log, index) => (
                        <div key={index} className="whitespace-pre-wrap">{log}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogSubscriber;

// Import necessary modules from the @foxglove/cdr package
import { CdrReader, CdrSizeCalculator, CdrWriter } from "@foxglove/cdr";

// Function to execute the CDR operations
const runCdrExample = () => {
    // Calculate size
    const calc = new CdrSizeCalculator();
    calc.int8();
    calc.uint8();
    calc.int16();
    calc.uint16();
    calc.int32();
    calc.uint32();
    calc.int64();
    calc.uint64();
    calc.float32();
    calc.float64();
    calc.string("abc".length);
    calc.sequenceLength();
    console.log('Calculated size:', calc.size);

    // Write data
    const writer = new CdrWriter();
    writer.int8(-1);
    writer.uint8(2);
    writer.int16(-300);
    writer.uint16(400);
    writer.int32(-500_000);
    writer.uint32(600_000);
    writer.int64(-7_000_000_001n);
    writer.uint64(8_000_000_003n);
    writer.float32(-9.14);
    writer.float64(1.7976931348623158e100);
    writer.string("abc hello world!");
    // writer.sequenceLength(0);

    // Read data
    const reader = new CdrReader(writer.data);
    console.log('Read values:');
    console.log(reader.int8());
    console.log(reader.uint8());
    console.log(reader.int16());
    console.log(reader.uint16());
    console.log(reader.int32());
    console.log(reader.uint32());
    console.log(reader.int64());
    console.log(reader.uint64());
    console.log(reader.float32());
    console.log(reader.float64());
    console.log(reader.string());
    // console.log(reader.sequenceLength());
};




// Function to convert octet string to Uint8Array
const convertOctetToUint8Array = (octetString) => {
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

// Example octet-encoded value (Base64 encoded for demonstration)
const octetValue = "AAEAAAcAAAAAAAAA"; // Replace this with your actual octet value

// Convert and log the result
const uint8Array = convertOctetToUint8Array(octetValue);
console.log('this is decoded value',uint8Array);







const test1 = () => {
    const value = 15;
    // Write data
    const writer = new CdrWriter();
    writer.int64(BigInt(value));

    console.log('this is the writer object', writer);
    console.log('this is the writer.data', writer.data);


    const reader = new CdrReader(uint8Array);
    console.log(reader.int64(), 'here is the reader sum value');

}





// Run the example
runCdrExample();


console.log('next is sum value')

test1();

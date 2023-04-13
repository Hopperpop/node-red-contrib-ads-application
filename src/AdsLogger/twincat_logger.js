/*
Example how to subscribe and handle TwinCAT Logger data
https://jisotalo.github.io

Copyright (c) Jussi Isotalo <j.isotalo91@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
//const ads = require('ads-client');
const long = require('long'); //Required to handle FILETIME

/*
const client = new ads.Client({
  targetAmsNetId: '127.0.0.1.1.1',
  targetAdsPort: 100,
  bareClient: true,
  allowHalfOpen: true
});
 */



/**
 * Converts msgType to array of message types
 * @param {number} msgTypeMask 
 * @returns 
 */
convertMsgType = (msgTypeMask) => {
  let strs = [];

  if ((msgTypeMask & 0x1) == 0x1)
    strs.push('hint')
  if ((msgTypeMask & 0x2) == 0x2)
    strs.push('warning')
  if ((msgTypeMask & 0x4) == 0x4)
    strs.push('error')
  if ((msgTypeMask & 0x10) == 0x10)
    strs.push('log')
  if ((msgTypeMask & 0x20) == 0x20)
    strs.push('msgbox')
  if ((msgTypeMask & 0x40) == 0x40)
    strs.push('resource')
  if ((msgTypeMask & 0x80) == 0x80)
    strs.push('string')

  return strs;
}

/**
 * Unpacks received TwinCAT Logger entry to object
 * @param {Buffer} data 
 * @returns 
 */
unpackTwinCatLoggerEntry = (data) => {
  let pos = 0;
  const row = {};
  const _unknown = {};
  
  //0..7 - timestamp
  row.timestamp = new Date(new long(data.readUInt32LE(pos), data.readUInt32LE(pos + 4)).div(10000).sub(11644473600000).toNumber());
  pos += 8;

  //8 - message type
  row.msgTypeMask = data.readUint8(pos);
  row.msgTypes = convertMsgType(row.msgTypeMask);
  pos += 1;

  //9 - unknown byte
  _unknown.byte_9 = data.readUint8(pos);
  pos += 1;

  //10 - unknown byte
  _unknown.byte_10 = data.readUint8(pos);
  pos += 1;

  //11 - unknown byte
  _unknown.byte_11 = data.readUint8(pos);
  pos += 1;

  //12..13 - sender ADS port
  row.senderAdsPort = data.readUint16LE(pos);
  pos += 2;

  //14 - unknown byte
  _unknown.byte_14 = data.readUint8(pos);
  pos += 1;

  //15 - unknown byte
  _unknown.byte_15 = data.readUint8(pos);
  pos += 1;

  //16..n - sender and payload string
  //There are also few bytes of unknown data between sender and msg, not handled here
  let str = data.slice(pos).toString().slice(0, -1);

  //Sender is from start of string until \0
  row.sender = str.substr(0, str.indexOf("\0"));

  //Message is from end until \0
  row.msg = str.substr(str.lastIndexOf("\0") + 1);

  //Uncomment to add unknown bytes to object
  //row._unknown = _unknown;

  //Uncomment to add raw data to object
  //row._raw = data;

  return row;
}


//Following can be used to test
//unpackTwinCatLoggerEntry(Buffer.from('50d8be9f72d6d80101000000102700005477696e4341542053797374656d00002000000054635254696d652053657276657220737461727465643a2054635254696d652e00', 'hex'));
/*
client.connect()
  .then(async res => {
    console.log(`Connected to the ${res.targetAmsNetId}`);
    console.log(`Router assigned us AmsNetId ${res.localAmsNetId} and port ${res.localAdsPort}`);

    await client.subscribeRaw(1, 0xffff, 1024, data => {
      const entry = unpackTwinCatLoggerEntry(data.value);

      console.log(entry);
      
    }, 0, false); //Note: cyclic and 0ms cycle time

    console.log('Subscribed');    
  })
  .catch(err => {
    console.log('Something failed:', err)
  })*/

  exports.unpackTwinCatLoggerEntry = unpackTwinCatLoggerEntry;
const fs = require('fs');
const fsPromises = require('fs/promises');
const { Transform } = require('stream');
const ACCESS_LOG = './access.log';


// try {
//     const data = fs.readFileSync(ACCESS_LOG, {
//         // encoding: 'utf-8',
//     });
//     console.log(data.toString());
// } catch (e) {
//     console.log(e);
// }

// fs.readFile(
//     ACCESS_LOG,
//     'utf-8',
//     (err, data) => {
//         if (err) console.log(err);
//         else console.log(data);
//     }
// );

// fsPromises.readFile(
//     ACCESS_LOG,
//     'utf-8',
// ).then(console.log).catch(console.log);

// fsPromises.readFile(
//     ACCESS_LOG,
//     'utf-8',
// ).then((data) => {
//     // do something
// }).catch((err) => {
//     // log error
// });

// fs.writeFileSync();
const requests = [
    `127.0.0.1 - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
    `127.0.0.1 - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
];

// fs.writeFile(
//     ACCESS_LOG,
//     `${requests[0]}\n`,
//     {
//         flag: 'a',
//     },
//     (err) => {
//         if (err) console.log(err);
//     }
// );

// fs.appendFile(ACCESS_LOG,
//     `${requests[0]}\n`,
//     {
//         encoding: 'utf-8',
//     },
//     (err) => {
//         if (err) console.log(err);
//     });

// Streams
// fs.ReadStream();
// fs.createReadStream();

// const readStream = fs.createReadStream(ACCESS_LOG, {
//     flags: 'r',
//     // autoClose: true,
//     // start
//     // end
//     highWaterMark: 128,
//     // fs: (fs.open())
//     // fd:
// });
//
// readStream.on('data', (chunk) => {
//     console.log(chunk);
// });
// readStream.on('end', () => console.log('Finished!'));
// readStream.on('error', () => console.log('Error =('));
//
// const writeStream = fs.createWriteStream(ACCESS_LOG, {
//     encoding: 'utf-8',
//     flags: 'a',
// });
//
// requests.forEach(log => {
//     writeStream.write(log);
//     writeStream.write('\n');
// });
//
// writeStream.on('finish', () => {
//     console.log('Write Finished!')
// })
// writeStream.end(() => {
//     console.log('Write Finished!')
// })

// Transform
const payedAccount = false;
const readStream = fs.createReadStream(ACCESS_LOG);
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        if (payedAccount) this.push(chunk);
        else {
            const transformed = chunk.toString().replace(/\d+\.\d+\.\d+\.\d+/g, '[IP not available in free version]');
            this.push(transformed);
        }
        callback();
    }
});

readStream.pipe(transformStream).pipe(process.stdout);

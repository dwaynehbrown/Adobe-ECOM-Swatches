/*



    S3 CONFIG

    TODO: 
 
*/

// const AWS = require('aws-sdk');
// const s3bucket = new AWS.S3({
//     accessKeyId: '',
//     secretAccessKey: '',
//     region: 'eu-west-2',
//     signatureVersion: 'v4'
// }),
//     params_put = {
//         Bucket: 'adobejs',
//         key: 'images',
//         Expires: 30
//     },
//     params_list = {
//         Bucket: 'adobejs',
//         Prefix: 'images/'
//     };

// let params_get = {
//     Bucket: 'adobejs',
//     Prefix: 'images/'
// };

// s3bucket.listObjects(params_list, (err, data) => {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);  
// });

// s3bucket.getSignedUrl('getObject', params_get, (err, url) => {
//     console.log (url);
//     if (err) return;
// })
// s3bucket.getSignedUrl('putObject', params, (err, url) => {
//     if (err) return;
// })



const S3Helper = {
  
}

module.exports = S3Helper;
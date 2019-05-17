import * as aws from 'aws-sdk'
import * as multer from 'multer'
import { Request } from 'express';
import * as multerS3 from 'multer-s3';
const s3Storage = require('multer-sharp-s3');
 
const s3 = new aws.S3();

const options = {
    s3: s3,
    Bucket: 'bucket-name',
    ACL: 'public-read',
    multiple: true,
    resize: [
        { suffix: 'xlg', width: 1200, height: 1200 },
        { suffix: 'lg', width: 800, height: 800 },
        { suffix: 'md', width: 500, height: 500 },
        { suffix: 'sm', width: 300, height: 300 },
        { suffix: 'xs', width: 100 },
        { suffix: 'original' }
    ],
    Key: function (req :Request , file : any, cb : any) {
      cb(null, Date.now().toString())
    }
  }

aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: "ab7786ad6",
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: "ab7786ad6",
    region: 'ap-northeast-2'
});

const upload = s3Storage(options);


export default upload
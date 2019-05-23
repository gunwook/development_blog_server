import * as aws from 'aws-sdk'
import * as multer from 'multer'
import { Request } from 'express';
import config from '../env/index';
const s3Storage = require('multer-sharp-s3');
 
aws.config.update({
  secretAccessKey: config.aws.SECRETACCESSKEY,
  accessKeyId: config.aws.ACCESSKEYID,
  region: config.aws.REGION
});

const s3 = new aws.S3();

const options = {
    s3: s3,
    Bucket: config.aws.BUCKET,
    ACL: config.aws.ACL,
    multiple: true,
    resize: [
        { suffix: 'sm', width: 300 },
        { suffix: 'xs', width: 100 },
        /*{ suffix: 'xlg', width: 1200, height: 1200 },
        { suffix: 'lg', width: 800, height: 800 },
        { suffix: 'md', width: 500, height: 500 },*/
        { suffix: 'original' }
    ],
    Key: function (req :Request , file : any, cb : any) {
      let date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      let path = `${year}/${month}/${day}/${date.getTime()}/${file.originalname.replace(/ /gi, "")}`;
      cb(null, path)
    }
  }


const upload = multer({ storage: s3Storage(options)})

export default upload
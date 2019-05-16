import * as aws from 'aws-sdk'
import * as multer from 'multer'
import { Request } from 'express';
import * as multerS3 from 'multer-s3';

var upload = multer({storage: multer.memoryStorage() })

export const imgUpload =  (files : Express.Multer.File[]) => {

    for (let index = 0; index < files.length; index++) {
        const fileObj = files[index]

        //라우터에 Multer 객체를 연결하면 input name이 일치하는 파일 데이터를 자동으로 받아서 req.files를 통해 접근할 수 있게 처리해 줍니다.
        //메모리 버퍼에 저장하는 형태를 선택했으므로 fileObj는 다음과 같은 속성을 갖게 됩니다.
        fileObj.buffer //예) Buffer 객체
        fileObj.originalname //예) abc.jpg
        fileObj.mimetype //예)'image/jpeg'

        //아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
        aws.config.region = 'ap-northeast-2'; //Seoul
        aws.config.update({
        accessKeyId: "*",
        secretAccessKey: "*"
        });

        var s3_params = {
            Bucket: 'bucket-name',
            Key: fileObj.originalname,
            ACL: 'public-read',
            ContentType: fileObj.mimetype
        };

        var s3obj = new aws.S3();
    }

}
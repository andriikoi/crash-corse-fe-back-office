import S3 from 'aws-sdk/clients/s3';

export const s3 = new S3({
    region: process.env.S3_REGION,
    secretAccessKey: process.env.S3_SECRET_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    signatureVersion: 'v4'
});

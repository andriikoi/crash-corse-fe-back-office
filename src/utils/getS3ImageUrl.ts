export const getS3ImageUrl = (imageName: string, userId: string): string => {
    const BUCKET_NAME = process.env.S3_BUCKET_NAME;
    const REGION = process.env.S3_REGION;
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${userId}/${imageName}`;
}

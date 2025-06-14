import AWS from "aws-sdk";
import config from "../config";

// Files Parameters

interface GetPresignedUrlParams {
  filename: string;
}
interface uploadImageParams {
  file: Buffer;
  folder: string;
}

const getPresignedUrl = async ({ filename }: GetPresignedUrlParams): Promise<string> => {
  const S3_BUCKET = config.aws.bucket;

  // S3 Region
  const REGION = config.aws.region;

  // S3 Credentials
  AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  });

  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const presignedGetUrl = await s3.getSignedUrlPromise("putObject", {
    Bucket: S3_BUCKET,
    Key: filename, // filename
    Expires: 1000 * 300,
    // ContentType: "application/pdf", // time to expire in seconds
  });

  return presignedGetUrl;
};

const uploadImage = async(file:Buffer , folder: string)=>{
  // console.log("File =>",file);
  // console.log("Folder =>",folder);
  const S3_BUCKET = config.aws.bucket;
  console.log("Access key ID =>",config.aws.accessKeyId);
  console.log("Secret Access Key  =>",config.aws.secretAccessKey);
  console.log("S3 Bucket  =>",S3_BUCKET);
  
  AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
  });
  let params = {
    Bucket: "pdf-bucket-for-pdf-to-json-storage",
    Key: folder,
    Body: file,
    ACL: "public-read",
  };
  // const s3 = new AWS.S3({
  //   params: { Bucket: S3_BUCKET },
  //   region: REGION,
  // });
  try {
    await new AWS.S3().putObject(params).promise();
  
    return Promise.resolve({url:folder});
  } catch (err) {
    console.log("Error =>" , err);
    // return {error:err};
    return null;
  }
} 

export {getPresignedUrl,uploadImage};
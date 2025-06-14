import s3Client from '../../../lib/s3'
import path from 'path'
import User from '../../models/user.model'

const BUCKET_NAME = process.env.AWS_S3_PROFILE_BUCKET
const FEEDBACK_BUCKET_NAME = process.env.AWS_S3_FEEDBACK_BUCKET
const COMMON_BUCKET = process.env.AWS_S3_COMMON_BUCKET
export const uploadProfileImage = async (file, userId) => {
  if (!file || !userId) {
    throw new Error('File and userId are required')
  }
  // Generate a unique file name
  const extension: any = path.extname(file.originalname)
  const newFileName = `${userId}-${Date.now()}${extension}`
  const key = `profiles/${newFileName}`

  // List existing files for the user
  const listParams: any = {
    Bucket: BUCKET_NAME,
    Prefix: `profiles/${userId}-`
  }

  try {
    // Step 1: List objects to check for an existing file
    const existingFiles: any = await s3Client
      .listObjectsV2(listParams)
      .promise()

    // Step 2: Delete existing files if any
    if (existingFiles?.Contents.length > 0) {
      const deleteParams: any = {
        Bucket: BUCKET_NAME,
        Delete: {
          Objects: existingFiles?.Contents.map(file => ({ Key: file.Key }))
        }
      }
      await s3Client.deleteObjects(deleteParams).promise()
    }

    // Step 3: Upload new file
    const uploadParams: any = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read' // Make the file publicly accessible
    }

    await s3Client.upload(uploadParams).promise()

    // Step 4: Return the public URL of the new file
    await User.updateOne({_id:userId},{
      $set: {
        profile_image: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
      }
    })
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('Could not upload file. Please try again later.')
  }
}
export const uploadKycImage = async (file, userId) => {
  if (!file || !userId) {
    throw new Error('File and userId are required')
  }
  // Generate a unique file name
  const extension: any = path.extname(file.originalname)
  const newFileName = `${userId}-${Date.now()}${extension}`
  const key = `profiles/${newFileName}`

  // List existing files for the user
  const listParams: any = {
    Bucket: BUCKET_NAME,
    Prefix: `profiles/${userId}-`
  }

  try {
    // Step 1: List objects to check for an existing file
    const existingFiles: any = await s3Client
      .listObjectsV2(listParams)
      .promise()

    // Step 2: Delete existing files if any
    if (existingFiles?.Contents.length > 0) {
      const deleteParams: any = {
        Bucket: BUCKET_NAME,
        Delete: {
          Objects: existingFiles?.Contents.map(file => ({ Key: file.Key }))
        }
      }
      await s3Client.deleteObjects(deleteParams).promise()
    }

    // Step 3: Upload new file
    const uploadParams: any = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read' // Make the file publicly accessible
    }

    await s3Client.upload(uploadParams).promise()

    // Step 4: Return the public URL of the new file
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('Could not upload file. Please try again later.')
  }
}

export const uploadCommonImage = async (file, userId) => {
  console.log(file, userId)
  if (!file || !userId) {
    throw new Error('File and userId are required');
  }

  const extension = path.extname(file.originalname);
  const newFileName = `${userId}-${Date.now()}${extension}`;
  const key = `location/${newFileName}`;

  const uploadParams: any = {
    Bucket: COMMON_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: 'public-read', // Make the file publicly accessible
  };

  try {
    await s3Client.upload(uploadParams).promise();
    return `https://${COMMON_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Could not upload file. Please try again later.');
  }
};
export const uploadFeedbackFile = async (file, userId) => {
  if (!file || !userId) {
    throw new Error('File and userId are required')
  }
  // Generate a unique file name
  const extension: any = path.extname(file.originalname)
  const newFileName = `${userId}-${Date.now()}${extension}`
  const key = `feedbacks/${newFileName}`
  try {
    const uploadParams: any = {
      Bucket: FEEDBACK_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read' // Make the file publicly accessible
    }

    await s3Client.upload(uploadParams).promise()

    // Step 4: Return the public URL of the new file
    return `https://${FEEDBACK_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('Could not upload file. Please try again later.')
  }
}
export const uploadLocationImage = async (file, userId) => {
  if (!file || !userId) {
    throw new Error('File and userId are required');
  }

  const extension = path.extname(file.originalname);
  const newFileName = `${userId}-${Date.now()}${extension}`;
  const key = `location/${newFileName}`;

  const uploadParams: any = {
    Bucket: COMMON_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: 'public-read', // Make the file publicly accessible
  };

  try {
    await s3Client.upload(uploadParams).promise();
    return `https://${COMMON_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Could not upload file. Please try again later.');
  }
};
export default uploadProfileImage

import config from '../config'

import aws from 'aws-sdk'

const s3 = new aws.S3({
  ...config.aws_s3_image
})

export default s3

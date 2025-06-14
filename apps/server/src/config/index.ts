import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)
})

console.log(
  dotenv.config({ path: path.resolve(__dirname, '../../.env.development') })
)

const config = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '0', 10),
  videoPort: parseInt(process.env.VIDEO_PORT || '0', 10),
  databaseURL:
    process.env.MONGO_DB_URI || 'mongodb://localhost:27017/screenplay',
  forgotPasswordRedirectUrl: process.env.FOROGOT_PASSWORD_REDIRECT_URL,
  secretKeys: {
    auth: process.env.JWT_SALT
  },
  api: {
    prefix: '/api'
  },
  googleOAuth: {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUri: `${process.env.FRONTEND_BASEURL}/google/redirect`
  },
  logs: {
    level: process.env.LOG_LEVEL || 'debugs'
  },
  url: {
    frontendBaseUrl: process.env.FRONTEND_BASEURL,
    backendBaseUrl: process.env.BACKEND_BASEURL
  },
  session: {
    secret: process.env.SESSION_SECRET
  },
  crypto: {
    key: process.env.CRYPTO_KEY,
    iv: process.env.CRYPTO_IV
  },
  email: {
    owner_email: process.env.OWNER_EMAILID,
    password: process.env.SMTP_PASSWORD,
    smtp_server: process.env.SMTP_SERVER
  },
  aws: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_S3_BUCKET
  },
  aws_s3_image: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  },

  aws_ses: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  }
}

export default config

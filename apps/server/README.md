## Getting Started

1.  Clone the Repository

         git clone https://github.com/ScreenPlay-INk/server.git
         cd server

2.  Add the .env file at the root folder will filename ".env.development".
3.  Add below variables in ".env.development" file:-

         PORT=
         VIDEO_PORT=
         NODE_ENV=development
         MONGO_DB_URI=
         GOOGLE_OAUTH_CLIENT_ID=
         GOOGLE_OAUTH_CLIENT_SECRET=
         GOOGLE_OAUTH_REDIRECT_URI=
         FRONTEND_BASEURL=
         SESSION_SECRET=
         OWNER_EMAILID=
         SMTP_PASSWORD=
         SMTP_SERVER=
         AWS_S3_BUCKET=
         AWS_REGION=
         AWS_S3_ACCESS_KEY_ID=
         AWS_S3_SECRET_ACCESS_KEY=

4.  Install all the dependencies:

        npm i

5.  Run the server:

        npm run windows-start

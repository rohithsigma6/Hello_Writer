import { SES } from 'aws-sdk'
import fs from 'fs'
import hogan from 'hogan.js'
import config from '../../config'

const ses = new SES({
  region: 'ap-south-1', // or the region you are using
  accessKeyId: config.aws_ses.accessKeyId, // Ensure your AWS credentials are set up
  secretAccessKey: config.aws_ses.secretAccessKey
})

const processRecoveryEmail = async (
  userId: string,
  firstName: string | unknown,
  email: string,
  recoverHash: string
) => {
  const link = `${config.url.frontendBaseUrl}/auth/reset-password?id=${userId}&code=${recoverHash}`
  const templatePath = './src/lib/mail/formatted_emails/reset_password.html'
  const templateData = {
    userId,
    email,
    firstName,
    link,
    welcomeMessage: 'Change password'
  }

  await sendFormattedEmail(email, 'Change password', templatePath, templateData)
}
const sendSubscriptionConfirmationEmail = async (
  userName: string,
  email: string,
  plan: string,
  amountPaid: number,
  transactionId: string,
  date: Date
) => {
  const loginLink = `${config.url.frontendBaseUrl}/auth/login`
  const supportEmail = config.email.owner_email

  const content = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">🎉 Congratulations and Welcome to Screenplay.ink, ${userName}!</h2>
      <p>We’re thrilled to have you on board as one of our exclusive Beta users. Your subscription to the <strong>${plan}</strong> plan has been successfully activated. You're now part of a select group of writers helping shape the future of screenwriting with Screenplay.ink.</p>

      <h3>What’s Next?</h3>
      <p>You can now dive into our real-time collaborative screenplay editor, unlock powerful prewriting tools, and start exploring the full suite of features designed to elevate your storytelling journey.
      Here are some of the perks you can start using right away:
      </p>
      <ul>
      <li>Unlimited Projects with Multilingual Support</li>
      <li>Advanced AI-driven Prewriting Tools</li>
        <li>5,000 Ink Credits per Month</li>
        <li>Priority Support & Free Updates</li>
        <li>Exclusive Early Adopter Benefits</li>
        </ul>

        <p>Your unique journey as a screenwriter begins now, and we can’t wait to see the incredible stories you’ll create with us. Remember, we’re here to support you every step of the way.</p>
        <h3>Receipt Details:</h3>
        <p>
        <strong>Plan:</strong> ${plan}<br>
        <strong>Amount Paid:</strong> ${amountPaid}<br>
        <strong>Transaction ID:</strong> ${transactionId}<br>
        <strong>Date:</strong> ${date}
        </p>
        <p>Your receipt is attached to this email for your records. If you need any assistance or have any questions, please don’t hesitate to reach out to our support team at [Support Email].

        </p>
        <h3>Get Started:</h3>        
        <p>Click the link below  to log in and start exploring Screenplay.ink:</p> 
        <a href="${config.url.frontendBaseUrl}" style="color: #4CAF50;">${config.url.frontendBaseUrl}</a>
        <h3>Wishing you a wonderful and creative writing journey ahead!</h3>
        <p>Thank you for choosing Screenplay.ink. We’re excited to have you with us, and we look forward to supporting your growth as a storyteller.</p>
<p>Happy writing! ✍️
</p>      
        <h3>Warm Regards,</h3>
 <p> The Screenplay.ink Team, <br>
  <a href="mailto:${supportEmail}" style="color: #4CAF50;">${supportEmail}</a> | <a href="${config.url.frontendBaseUrl}" style="color: #4CAF50;">${config.url.frontendBaseUrl}</a> </p>
<hr style="border-top: 1px solid #ccc;" />
      <p style="font-size: 12px; color: #777;">If you did not request anything from Screenplay.ink, you can safely ignore this email.</p>
    </div>
  `
  const compiled = hogan.compile(content)
  const rendered = compiled.render({
    content,
    welcomeMessage:
      'Welcome to Screenplay.ink! Your Subscription is Confirmed 🎉'
  })
  await sendEmail(
    email,
    'Welcome to Screenplay.ink! Your Subscription is Confirmed 🎉',
    rendered
  )
}
const sendCollabEmail = async ({
  inviterName,
  fileName,
  fileLink,
  invitesName,
  invitesEmail
}: any) => {
  const templatePath =
    './src/lib/mail/formatted_emails/collobration_template.html'
  const templateData = {
    inviterName,
    link: fileLink,
    fileName,
    invitesName,
    invitesEmail
  }

  await sendFormattedEmail(
    invitesEmail,
    'You are invited for collabration',
    templatePath,
    templateData
  )
}
const sendVerificationEmail = async (
  userId: string,
  firstName: string | unknown,
  email: string,
  lifetimeRegistered: boolean | unknown,
  emailHash: string
) => {
  const templatePath =
    './src/lib/mail/formatted_emails/verification_template.html'
  const templateData = {
    userId,
    firstName,
    email,
    link: `${config.url.backendBaseUrl}/api/auth/verify-email?id=${userId}&code=${emailHash}&lifetimeRegistered=${lifetimeRegistered}`,
    welcomeMessage: 'Verify your account'
  }

  await sendFormattedEmail(
    email,
    'Verify Your Account',
    templatePath,
    templateData
  )
}
const sendFormattedEmail = async (
  email: string,
  subject: string,
  templatePath: string, // Path to the email template
  templateData: Record<string, any> // Data to populate the template
) => {
  try {
    // Read and compile the template
    const template = fs.readFileSync(templatePath, 'utf-8')
    const compiled = hogan.compile(template)
    const rendered = compiled.render(templateData)

    // Send the email
    await sendEmail(email, subject, rendered)
  } catch (error) {
    console.error('Error in sendFormattedEmail:', error)
    throw new Error('Failed to send formatted email')
  }
}
const sendEmail = async (to: string, subject: string, content: string) => {
  if (!config.email.owner_email) {
    throw new Error('Sender email is not configured')
  }

  const params = {
    Source: config.email.owner_email,
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: content,
          Charset: 'UTF-8'
        }
      }
    }
  }

  try {
    const result = await ses.sendEmail(params).promise()
    console.log('Email sent successfully:', result)
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export {
  sendVerificationEmail,
  processRecoveryEmail,
  sendCollabEmail,
  sendSubscriptionConfirmationEmail
}

import sendGridMail from '@sendgrid/mail'

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

const getMessage = (email: string) => {
  const body = 'This is a test email using SendGrid from Node.js'
  return {
    to: email,
    from: 'mail@dennisdijkstra.com',
    subject: 'Test email with Node.js and SendGrid',
    text: body,
    html: `<strong>${body}</strong>`,
  }
}

export const sendEmail = async (email: string) => {
  try {
    await sendGridMail.send(getMessage(email))
    console.log('Test email sent successfully')
  } catch (error) {
    console.error('Error sending test email')
    console.error(error)
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

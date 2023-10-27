import sendGridMail from '@sendgrid/mail'

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

type Email = {
  to: string,
	subject: string
	text: string
  html: string
}

const getMessage = ({ to, subject, text, html }: Email) => {
  return {
    to,
    from: 'mail@dennisdijkstra.com',
    subject,
    text,
    html,
  }
}

export const sendEmail = async ({ to, subject, text, html }: Email) => {
  try {
    await sendGridMail.send(getMessage({ to, subject, text, html }))
  } catch (error) {
    console.error(error)
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

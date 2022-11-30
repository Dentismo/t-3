import { Api } from '../Api'

type SendEmailOptions = {
  from: string
  to: string
  subject: string
  html: string
}

const sendEmail = async (options: SendEmailOptions) => {
  try {
    const response = await Api.post('/mail', options)
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

export default sendEmail

import { Api } from '../Api'
import { Booking } from '../pages/DashboardPage/types'

type SendEmailOptions = {
  booking: Booking
  type: 'approved' | 'denied'
}

/**
 * Sends HTTP request to backend API, which uses nodemailer to send an email to the address specified in `booking`
 * @param options.booking Booking object corresponding to the email
 * @param options.type Verb specifying what action was taken by the clinic
 */
const sendEmail = async (options: SendEmailOptions) => {
  try {
    const response = await Api.post('/mail', options)
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

export default sendEmail

import nodemailer from 'nodemailer'

export function getClientsTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: 'clientes@veronicanutrivet.com.ar',
      pass: process.env.SMTP_CLIENT_PASS
    }
  })
}

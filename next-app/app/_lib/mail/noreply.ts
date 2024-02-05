import nodemailer from 'nodemailer'

export function getNoReplyTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: 'noreply@veronicanutrivet.com.ar',
      pass: process.env.SMTP_NOREPLY_PASS
    }
  })
}

import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    })
    const htmlContent = `
        <h1>Problem report on VEROROFFOVET</h1>
        <p style="padding-left: 6px">${req.body.report}</p>
    `
    transporter
      .sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.DEV_MAIL,
        subject: 'Problem report on VEROROFFOVET',
        html: htmlContent
      })
      .then(sent => {
        if (sent.accepted) return res.send('Email sent')
        return res.send(sent.response)
      })
      .catch(err => {
        console.log(err)
        res.status(400).send('something went wrong')
      })
  }
}

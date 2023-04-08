import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    })
    const { timestamp, location, env, data } = req.body

    const htmlContent = `
    <h1>Problem report on VEROROFFOVET</h1>
    <div style="padding-left: 8px">
        <p style="margin: 2px">${location} ( ${timestamp} )</p>
        <p style="margin: 2px">ENV: ${env.platform} - ${env.userAgentData}</p>
        <p style="margin: 2px">Error: ${data.message}: </p>
        <pre style="margin: 4px">Trace: ${data.stack}: </pre>
    </div>
    `
    return await transporter
      .sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.DEV_MAIL,
        subject: 'Error report on VEROROFFOVET',
        html: htmlContent
      })
      .then(sent => {
        if (sent.accepted) return res.send('Email sent')
        return res.send(sent.response)
      })
      .catch(err => {
        console.log(err)
        return res.status(400).send('something went wrong')
      })
  }
}

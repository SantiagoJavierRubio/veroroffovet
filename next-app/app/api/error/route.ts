import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  })
  const { timestamp, location, env, data } = await request.json()

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
      if (sent.accepted) return NextResponse.json('Email sent')
      return NextResponse.json(sent.response)
    })
    .catch(err => {
      console.log(err)
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 400 }
      )
    })
}

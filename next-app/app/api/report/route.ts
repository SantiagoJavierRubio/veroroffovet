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

  const { report } = await request.json()

  const htmlContent = `
          <h1>Problem report on VEROROFFOVET</h1>
          <p style="padding-left: 6px">${report}</p>
      `
  return await transporter
    .sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.DEV_MAIL,
      subject: 'Problem report on VEROROFFOVET',
      html: htmlContent
    })
    .then(sent => {
      if (sent.accepted) return Response.json('Email sent')
      return Response.json(sent.response)
    })
    .catch(err => {
      console.log(err)
      return Response.json({ error: 'Something went wrong' }, { status: 400 })
    })
}

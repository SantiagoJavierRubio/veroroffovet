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

  const { consulta, nombre, email, celular } = await request.json()

  const htmlContent = `
          <h1>Consulta clinica</h1>
          <p style="padding-left: 6px">${consulta}</p>
          <p>De:</p>
          <div style="padding-left: 8px">
              <p style="margin: 2px">${nombre}</p>
              <p style="margin: 2px">${email}</p>
              <p style="margin: 2px">Cel: ${celular || '-'}</p>
          </div>
      `
  return await transporter
    .sendMail({
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Consulta clinica de ${nombre}`,
      html: htmlContent
    })
    .then(sent => {
      if (sent.accepted) return Response.json('email sent')
      return Response.json(sent.response)
    })
    .catch(err => {
      console.log(err)
      return Response.json({ error: 'Something went wrong' }, { status: 400 })
    })
}

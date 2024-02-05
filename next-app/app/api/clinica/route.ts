import { getClientsTransporter } from '@/app/_lib/mail/clients'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const transporter = getClientsTransporter()

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
      from: 'clientes@veronicanutrivet.com.ar',
      to: process.env.GMAIL_USER,
      subject: `Consulta clinica de ${nombre}`,
      html: htmlContent
    })
    .then(sent => {
      if (sent.accepted) return NextResponse.json('email sent')
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

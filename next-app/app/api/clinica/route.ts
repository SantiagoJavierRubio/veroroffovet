import { getClientsTransporter } from '@/app/_lib/mail/clients'
import { CLIENTS_FROM } from '@/app/_lib/mail/constants'
import { getClinicaHTML } from '@/app/_lib/mail/templates/clinica'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const transporter = getClientsTransporter()

  const inputs = await request.json()

  // const htmlContent = getClinicaHTML(inputs)

  return await transporter
    .sendMail({
      from: CLIENTS_FROM,
      to: process.env.GMAIL_USER,
      subject: `Consulta clinica de ${inputs.nombre}`,
      html: getClinicaHTML(inputs)
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

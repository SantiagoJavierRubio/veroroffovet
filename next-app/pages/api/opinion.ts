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
    const {
      nombreTutor,
      nombrePaciente,
      conforme,
      cambios,
      recomendacion,
      testimonio
    } = req.body
    const htmlContent = `
        <h1>Encuesta de opinión</h1>
        <h3>De: ${nombreTutor || 'Anónimo'}</h3>
        <h4>Paciente: ${nombrePaciente || 'Anónimo'}</h4>
        <p>¿Estás conforme con el servicio prestado? <span>${conforme}</span></p>
        ${cambios && '<p>¿Qué cambiarías?</p>'}
        <p>${cambios || ''}</p>
        <p>¿Me recomendarías con otros/as tutores/as? <span>${recomendacion}</span></p>
        ${
          testimonio &&
          `
            <h6>Testimonio</h6>
            <p>${testimonio}</p>
        `
        }
    `
    return await transporter
      .sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `Encuesta de opinión`,
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

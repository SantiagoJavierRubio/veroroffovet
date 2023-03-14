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
    const htmlContent = `
        <h1>Consulta clinica</h1>
        <p style="padding-left: 6px">${req.body.consulta}</p>
        <p>De:</p>
        <div style="padding-left: 8px">
            <p style="margin: 2px">${req.body.nombre}</p>
            <p style="margin: 2px">${req.body.email}</p>
            <p style="margin: 2px">Cel: ${req.body.celular || '-'}</p>
        </div>
    `
    return await transporter
      .sendMail({
        from: req.body.mail,
        to: process.env.GMAIL_USER,
        subject: `Consulta clinica de ${req.body.nombre}`,
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

import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import {
  attachment,
  FormularioData
} from '@/components/Formulario/formularioHelpers'
import type { Attachment } from 'nodemailer/lib/mailer'

function formatFileToMailAttachment(fileData: attachment | null) {
  if (fileData && fileData.data) {
    return {
      filename: fileData.filename,
      content: fileData.data.split('base64,')[1],
      encoding: 'base64'
    }
  } else return null
}

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
    const {
      nombreTutor,
      apellidoTutor,
      mail,
      celular,
      dietaElegida,
      nombrePaciente,
      especie,
      raza,
      sexo,
      castrado,
      edad,
      peso,
      estudios,
      otrosAnimales,
      dietaActual,
      actividad,
      antecedentes,
      graficoPeso,
      costillas,
      fotoPerfil,
      fotoArriba
    } = req.body as FormularioData

    const attachments = [
      formatFileToMailAttachment(fotoArriba),
      formatFileToMailAttachment(fotoPerfil),
      ...estudios.map(estudio => formatFileToMailAttachment(estudio))
    ].filter(entry => !!entry)

    const mailData = {
      from: mail,
      to: process.env.GMAIL_USER,
      subject: `Solicitud de asesoria nutricional - ${nombreTutor} ${apellidoTutor}`,
      text: 'Probando x ahora',
      attachments: attachments as Attachment[]
    }
    transporter
      .sendMail(mailData)
      .then(sent => {
        if (sent.accepted) return res.send('Email sent')
        return res.send(sent.response)
      })
      .catch(err => {
        console.log(err)
        res.status(400).send('todoMal')
      })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
}

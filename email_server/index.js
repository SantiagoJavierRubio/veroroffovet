import express from "express"
import nodemailer from "nodemailer"
import cors from 'cors'
import "dotenv/config"

console.log(process.env.NODE_ENV)

const app = express()
app.use(express.json({
    limit: '10mb'
}))
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : [process.env.CLIENT_URL, process.env.CLIENT_URL_2]
}))

app.get('/', (req, res) => res.send('Email server to bypass vercel 4.5mb limit'))

export const COSTILLAS_TEXT = [
    'Es imposible contarle las costillas',
    'Pude contarlas pero tuve que hacer mucha presión para sentirlas',
    'Las conté con facilidad',
    'Ni necesité palpar, se ven a simple vista'
  ]

app.post('/asesoria', async (req, res) => {
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
        fotoArriba,
        disponibilidad,
        aclaraciones
    } = req.body

    const attachments = [
        formatFileToMailAttachment(fotoArriba),
        formatFileToMailAttachment(fotoPerfil),
        ...estudios.map(estudio => formatFileToMailAttachment(estudio))
    ].filter(entry => !!entry)

    const mailHTML = `
        <h1>Pedido de turno para asesoria nutricional</h1>
        Tipo de dieta: ${setBoldText(dietaElegida)} <br />
        Tutor: 
        <a href="mailto:${mail}?Subject=Turno%20asesoría%20nutricional%20-%20${nombrePaciente}" style="text-transform: capitalize;">
        ${setBoldText(nombreTutor + ' ' + apellidoTutor)} 
        <span style="text-transform: none">(${mail})</span>
        </a> <br />
        ${celular && `Celular: ${setBoldText(celular)}`}
        <h2>Paciente:</h2>
        <p>
        Nombre: ${setBoldText(nombrePaciente)} <br />
        Especie: ${setBoldText(especie)} <br />
        Sexo: ${setBoldText(sexo)} <br />
        Edad: ${setBoldText(edad)} <br />
        Raza: ${setBoldText(raza)} <br />
        Especie: ${setBoldText(especie)} <br />
        Castrado: ${setBoldText(castrado ? 'Si' : 'No')} <br />
        Peso: ${setBoldText(peso.toString() + ' Kg')}  <br />
        </p>
        <h3>Que come actualmente?</h3>
        <p>${dietaActual || ' - '}</p>
        <h3>Convive con otros animales?</h3>
        <p>${otrosAnimales || ' - '}</p>
        <h3>Nivel de actividad:</h3>
        <p>${actividad || ' - '}</p>
        <h3>Antecedentes:</h3>
        <p>${antecedentes || ' - '}</p>
        <p>En el grafico elegi la opcion numero ${setBoldText(graficoPeso.toString())}</p>
        <p>Al palparle las costillas ${setBoldText(COSTILLAS_TEXT[costillas])}</p>
        <h3>Foto desde arriba</h3>
        <img src="cid:${fotoArriba?.filename}" style="max-width: 500px" />
        <p>${fotoArriba?.filename}</p>
        <br />
        <h3>Foto de perfil</h3>
        <img src="cid:${fotoPerfil?.filename}" style="max-width: 500px" />
        <p>${fotoPerfil?.filename}</p>
        <div>
        <h3>Disponibilidad horaria:</h3>
        <table style="border: 1px solid;">
            <tr>
            <th style="border: 1px solid; padding: 1rem;">Dia</th>
            <th style="border: 1px solid; padding: 1rem;">Disponibilidad</th>
            </tr>
            ${displayDisponibilidad(disponibilidad)}
        </table>
        </div>
        <h3>Aclaraciones: </h3>
        <p>${aclaraciones}</p>
    `

    const mailData = {
        from: mail,
        to: process.env.GMAIL_USER,
        subject: `Solicitud de asesoria nutricional - ${nombreTutor} ${apellidoTutor}`,
        html: mailHTML,
        attachments: attachments
    }
    transporter
        .sendMail(mailData)
        .then(sent => {
            if (sent.accepted) return res.send('Email sent')
                return res.send(sent.response)
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('something went wrong')
        })
    }
)

function formatFileToMailAttachment(fileData) {
    if (fileData && fileData.data) {
      return {
        filename: fileData.filename,
        cid: fileData.filename,
        content: fileData.data.split('base64,')[1],
        encoding: 'base64'
      }
    } else return null
  }
  
  function setBoldText(text) {
    return `
      <span style="font-weight: bold">
        ${text}
      </span>
    `
  }
  
  function displayDisponibilidad(disponibilidad) {
    let result = ''
    for (const [day, text] of Object.entries(disponibilidad)) {
      if (!text) continue
      result += `
      <tr>
        <td style="border: 1px solid; padding: 1rem; font-weight: bold; text-transform: capitalize">${day}</td>
        <td style="border: 1px solid; padding: 1rem;">${text}</td>
      </tr>
      `
    }
    return result
  }
  
  const PORT = process.env.PORT || 8080

  const server = app.listen(PORT, () => {
    console.log('Email server running on port ', PORT)
  })

  server.on('error', (err) => {
    console.error('SERVER ERROR: ', err)
  })
  server.on('exit', (_code, _signal) => {
    console.log('Server exited: \n', 'Code: ', _code, '\nSignal: ', _signal)
  })
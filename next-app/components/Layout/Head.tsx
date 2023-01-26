import NextHead from "next/head"

interface HeadProps {
    title?: string;
    description?: string;
}

const DEFAULT_TITLE = "Veronica Roffo - Veterinaria"
const DEFAULT_DESCRIPTION = "Asesorias nutricionales y veterinaria clinica. Buenos Aires - Argentina"

export default function Head(props: HeadProps) {
  return (
    <NextHead>
        <title>{props.title || DEFAULT_TITLE}</title>
        <meta name="description" content={props.description || DEFAULT_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
    </NextHead>
  )
}

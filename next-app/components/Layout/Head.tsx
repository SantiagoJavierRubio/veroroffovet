import NextHead from 'next/head'

interface HeadProps {
  title?: string
  description?: string
}

const DEFAULT_TITLE = 'Veronica Roffo - Veterinaria'
const DEFAULT_DESCRIPTION =
  'Asesorias nutricionales y veterinaria clínica. Buenos Aires - Argentina'

export default function Head(props: HeadProps) {
  const { title, description } = props
  return (
    <NextHead>
      <title>{title || DEFAULT_TITLE}</title>
      <meta name="description" content={description || DEFAULT_DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="article" />
      <meta
        property="og:description"
        content={description || DEFAULT_DESCRIPTION}
      />
      <meta property="og:site_name" content={title || DEFAULT_TITLE} />
      <meta property="og:image" content="/VR_logo.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </NextHead>
  )
}

'use client'
export default function Credit({ text }: { text: string }) {
  const html = `<!-- Credit: ${text} -->`
  const cb = (instance: HTMLScriptElement) => {
    if (instance) {
      instance.outerHTML = html
    }
  }

  return (
    <script
      ref={cb}
      type="text/comment"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

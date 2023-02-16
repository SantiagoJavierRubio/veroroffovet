import Link from 'next/link'
// TODO: Complete

export default function Footer() {
  return (
    <footer className="to-terciary from-terciary/10 text-primary mt-8 hidden h-24 w-full flex-col items-center justify-start bg-gradient-to-b p-6 sm:flex">
      <p>Veronica Roffo - Veterinaria MN 10468</p>
      <p>&copy; 2023 - Buenos Aires, Argentina</p>
      <Link href="/report">Report a problem!</Link>
    </footer>
  )
}

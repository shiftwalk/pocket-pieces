import Container from '@/components/container'

export default function Footer() {
  return (
    <footer className="mb-4">
      <Container>
        <div className="border-t border-black py-4">
          <div className="text-xs">
            <span className="inline-block">Pocket Pieces</span>
            <span className="inline-block">&nbsp;&bull;&nbsp;</span>
            <span className="inline-block">&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
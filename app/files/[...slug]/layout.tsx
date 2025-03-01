export default function BrowserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className='inline-block'>{children}</div>
    </section>
  )
}

export default function BrowserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className='inline-block text-center justify-center'>{children}</div>
    </section>
  )
}

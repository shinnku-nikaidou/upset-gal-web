export default function FilesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='flex flex-col items-center'>
      <div className='inline-block'>{children}</div>
    </section>
  )
}

export const metadata = {
  title: 'Blog list',
  description: 'All blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        {children}
    </>      
  )
}

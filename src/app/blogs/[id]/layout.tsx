import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
  // fetch data
  const blog = await fetch(`http://localhost:8000/blogs/${id}`).then((res) => res.json())
 
  return {
    title: "Blog detail | " + blog.title,
    description: blog.title
  }
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
  
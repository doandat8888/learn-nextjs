//import './globals.css'
'use client';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Container from "react-bootstrap/Container";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header />
          <Container>
              {children}
          </Container>
          <Footer />
          <ToastContainer />
      </body>
    </html>
  )
}
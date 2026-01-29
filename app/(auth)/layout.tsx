import { Footer } from "./_components/footer"
import { Navbar } from "./_components/navbar"
import "../globals.css";
type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  // return <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
  //   <Navbar />
  //   {children}
  //   <Footer />
  // </div>
  return <html lang="en">
    <body
      className={` bg-white text-amazon-text flex flex-col min-h-screen items-center pt-8`}
    >
      <Navbar />
      {children}
      <Footer />
    </body>
  </html>
}
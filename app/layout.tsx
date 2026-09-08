import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Mesozoic Lab | Explore dinosaurs in 360°",authors:[{name:"Foo Huey Chyun"}],creator:"Foo Huey Chyun",description:"Explore dinosaur models in 360 degrees, compare species and study fossil evidence with interactive palaeontology lessons.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body>{children}</body></html>}

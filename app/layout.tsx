import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Cinema Funnel | Creador IA Studio',description:'Una experiencia interactiva para descubrir Creador IA Studio.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}

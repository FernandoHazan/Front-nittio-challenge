import "./globals.css";

export const metadata = {
    title: "Meu App",
    description: "Aplicação Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>             
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
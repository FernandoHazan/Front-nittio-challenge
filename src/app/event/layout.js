import "./globals.css";

export const metadata = {
    title: "Meu App",
    description: "Aplicação Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
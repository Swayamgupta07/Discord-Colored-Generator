import type { Metadata } from 'next';
import { MantineProvider } from '@mantine/core';
import './globals.css';

export const metadata: Metadata = {
  title: "Swayam Discord Colored Text Generator",
  description: "Swayam Discord Colored Text Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Swayam" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
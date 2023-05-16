import { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={`https://fonts.googleapis.com/css2?Inter:wght@100;200;300;400;500;600;700;800;900&display=swap`} />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="h-full bg-gray-900 text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

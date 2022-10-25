import Head from 'next/head'

export default function Meta() {
    return (
        <>
        <Head>
            <title>NFTPort | NFT Minting Starter Kit</title>
            <meta name="description" content="NFTPort NFT Minting Starter Kit using NFTPort, Next.js, and Wagmi." />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />  
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:title" content="NFTPort | NFT Minting Starter Kit" />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="https://bored-apes-nft-landing-page-xrdg.vercel.app/" />
            <meta property="og:image" content="https://nftport-portfolio-bored-apes-starter-kit.vercel.app/og.jpg" />
            <meta name="twitter:title" content="NFTPort | Creator Minting Starter Kit" />
            <meta name="twitter:description" content="NFTPort Creator Minting Starter Kit using NFTPort, Next.js, and Wagmi." />
            <meta name="twitter:image" content="https://nftport-portfolio-bored-apes-starter-kit.vercel.app/og.jpg" />
            <meta name="twitter:card" content="summary_large_image"></meta>
        </Head>
        </>
    )
}
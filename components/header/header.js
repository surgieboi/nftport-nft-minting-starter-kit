import Logo from "../logo/logo";

export default function Header() {

    return (
        <>
            <nav className="fixed w-full flex items-center justify-between p-4 bg-slate-100 border-b border-slate-200">
                <Logo />
                <a className="p-4 hover:text-white hover:bg-slate-800 border border-slate-200 hover:border-slate-800 rounded-2xl" href="https://github.com/surgieboi/nftport-nft-minting-starter-kit" target="_blank">
                    View on Github
                </a>
            </nav>
        </>
    )
}
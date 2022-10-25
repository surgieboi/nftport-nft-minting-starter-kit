import Meta from '../meta/meta'
import Header from '../header/header'

export default function Layout({ children }) {
    return (
        <>
            <Meta></Meta>
            <Header></Header>
            <main className="px-10">
                <div className="w-full flex align-center">
                    {children}
                </div>
            </main>
        </>
    )
}
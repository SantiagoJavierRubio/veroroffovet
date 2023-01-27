import Head from "./Head";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { PropsWithChildren } from "react";

interface LayoutProps {
    title?: string;
    description?: string;
}

export default function Layout(props: PropsWithChildren<LayoutProps>) {
    const { title, description, children } = props
    return(
        <>
            <Head 
                title={title}
                description={description}
            />
            <NavBar />
            <main className="w-full min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    )
}
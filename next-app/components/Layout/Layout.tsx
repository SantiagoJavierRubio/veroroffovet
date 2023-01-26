import Head from "./Head";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { PropsWithChildren } from "react";

interface LayoutProps {
    title?: string;
    description?: string;
}

export default function Layout(props: PropsWithChildren<LayoutProps>) {
    return(
        <>
            <Head 
                title={props.title}
                description={props.description}
            />
            <NavBar />
            <main className="w-full h-screen text-primary">
                {props.children}
            </main>
            <Footer />
        </>
    )
}
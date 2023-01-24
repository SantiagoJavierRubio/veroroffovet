import Head from "./Head";
import Footer from "./Footer";
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
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )
}
import DATA, {DataType} from '../src/util/data';
import Head from "next/head";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Content from "../src/components/Content";
import useUrlSearchParams from "../src/util/useUrlSearchParams";

export async function getStaticProps(context) {
    return {
        props: {
            data: DATA,
        },
    }
}

type HomePageProps = {
    data: DataType,
}

export default function HomePage(props: HomePageProps) {
    const {data} = props;

    const [firstRender, urlSearchParams, setUrlSearchParams] = useUrlSearchParams();

    return (
        <>
            <Head>
                <title>Console Prices Adjusted for Inflation</title>
                <meta name="description" content="Game console prices adjusted for inflation"/>
                <noscript>
                    <style>
                        {".hide-without-js { display: none !important; }"}
                    </style>
                </noscript>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>

            <Header/>

            <Content
                key={firstRender ? "first" : "subsequent"}
                data={data}
                urlSearchParams={urlSearchParams}
                setUrlSearchParams={setUrlSearchParams}
            />

            <Footer data={data}/>
        </>
    );
}

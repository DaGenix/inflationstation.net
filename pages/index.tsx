import DATA, {DataType} from '../src/util/data';
import Head from "next/head";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Content from "../src/components/Content";
import useUrlSearchParams from "../src/util/useUrlSearchParams";
import theme from "../src/theme";

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
                <meta name="theme-color" content={theme.palette.primary.main} />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <noscript>
                    <style>
                        {".hide-without-js { display: none !important; }"}
                    </style>
                </noscript>
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

import DATA, {DataType} from '../src/util/data';
import Head from "next/head";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Content from "../src/components/Content";
import useUrlSearchParams from "../src/util/useUrlSearchParams";
import theme from "../src/theme";
import {Box} from "@mui/material";

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

    const [componentKey, urlSearchParams, setUrlSearchParams] = useUrlSearchParams();

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
                <style>
                    {`
                    html, body, #__next { height: 100% }
                    body {
                        background-color: #f3e8ff;
                    }
                    `}
                </style>
            </Head>

            <Box
                sx={{
                    minHeight: "100%",
                    display: "flex",
                    flexFlow: "column nowrap",
                    justifyItems: "flex-end",
                }}
            >
                <Header data={data} />

                <Content
                    key={componentKey}
                    data={data}
                    urlSearchParams={urlSearchParams}
                    setUrlSearchParams={setUrlSearchParams}
                />

                <Footer data={data}/>
            </Box>
        </>
    );
}

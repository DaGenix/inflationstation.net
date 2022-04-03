import Head from "next/head";
import {styled} from "linaria/react";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Content from "../src/components/Content";
import useFilterState from "../src/util/useFilterState";
import useFilterStateSyncer from "../src/util/useFilterStateSyncer";
import DATA, {DataType} from "../src/util/data";
import {css} from "linaria";

export async function getStaticProps(context) {
    return {
        props: {
            data: DATA
        },
    }
}

export const GLOBALS = css`
    :global() {
        /*
          Josh's Custom CSS Reset
          https://www.joshwcomeau.com/css/custom-css-reset/
        */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        * {
          margin: 0;
        }
        html, body, #__next {
          height: 100%;
        }
        body {
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }
        img, picture, video, canvas, svg {
          display: block;
          max-width: 100%;
        }
        input, button, textarea, select {
          font: inherit;
        }
        p, h1, h2, h3, h4, h5, h6 {
          overflow-wrap: break-word;
        }
        #root, #__next {
          isolation: isolate;
        }

        /* My stuff */
        html {
            background-color: #f1edf5;
        }
        html {
            font-family: sans-serif;
        }
    }
`;

type ContentWrapperProps = {
    data: DataType,
}

function ContentWrapper(props: ContentWrapperProps) {
    const {data} = props;
    const [filterState, updateFilterState] = useFilterState();
    useFilterStateSyncer(filterState, updateFilterState);
    return <Content data={data} filterState={filterState} updateFilterState={updateFilterState} />;
}

const Container = styled.header`
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
`;

type HomePageProps = {
    data: DataType,
}

export default function HomePage(props) {
    const {data} = props;
    return (
        <>
            <Head>
                <title>Console Prices Adjusted for Inflation</title>
                <meta name="description" content="Game console prices adjusted for inflation"/>
                <meta name="theme-color" content="#6A1B9A" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <noscript>
                    <style>
                        {".hide-without-js { display: none !important; }"}
                    </style>
                </noscript>
            </Head>

            <Container>
                <Header data={data} />
                <ContentWrapper data={data} />
                <Footer data={data} />
            </Container>
        </>
    );
}

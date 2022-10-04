import Head from "next/head";
import {styled} from "linaria/react";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Content from "../src/components/Content";
import DATA, {DataType} from "../src/util/data";
import {css} from "linaria";
import {theme} from "../src/components/theme";
import useUrlState from "../src/util/useUrlState";
import {DEFAULT_FILTER_STATE, deserializeUrlSearchParams, serializeUrlSearchParams} from "../src/util/filterState";

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
        #__next {
            isolation: isolate;
        }

        /* My stuff */
        html, body, #__next {
          min-height: 100vh;
        }
        html {
            font-family: 'Manrope', sans-serif;
        }
        html {
            background-color: ${theme.colors.background};
        }
        h1 {
            font-size: 32px;
            @media (min-width: 700px) {
                font-size: 64px;
            }
        }
        h2 {
            font-size: 24px;
        }
        a {
            color: ${theme.colors.linkText};
            font-weight: 700;
        }
        a:hover {
            text-decoration-thickness: 3px;
        }
    }
`;

type ContentWrapperProps = {
    data: DataType,
}

function ContentWrapper(props: ContentWrapperProps) {
    const {data} = props;
    const [filterState, setFilterState] = useUrlState(
        DEFAULT_FILTER_STATE,
        deserializeUrlSearchParams,
        serializeUrlSearchParams,
    );
    return <Content data={data} filterState={filterState} setFilterState={setFilterState}/>;
}

const Container = styled.main`
    min-height: 100vh;
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
                <meta name="theme-color" content={theme.colors.primary}/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>

            <Container>
                <Header data={data}/>
                <ContentWrapper data={data}/>
                <Footer data={data}/>
            </Container>
        </>
    );
}

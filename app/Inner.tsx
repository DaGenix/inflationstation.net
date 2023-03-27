"use client";

import useUrlState from "../src/util/useUrlState";
import {DEFAULT_FILTER_STATE, deserializeUrlSearchParams, serializeUrlSearchParams} from "../src/util/filterState";
import {WithDataContext} from "../src/util/useData";
import Header from "../src/components/Header";
import Content from "../src/components/Content";
import Footer from "../src/components/Footer";
import {DataType, InflationData, loadData, loadInflationData} from "../src/util/loadData";
import style from "./Inner.module.scss";

type HomePageProps = {
    data: DataType,
    inflationData: InflationData,
}

export default function Inner(props: HomePageProps) {
    const {data, inflationData} = props;
    const [filterState, setFilterState] = useUrlState(
        DEFAULT_FILTER_STATE,
        deserializeUrlSearchParams,
        serializeUrlSearchParams,
    );
    return (
        <>
            {/*<Head>*/}
            {/*    <title>Console Prices Adjusted for Inflation</title>*/}
            {/*    <meta name="description" content="Game console prices adjusted for inflation"/>*/}
            {/*    <meta name="theme-color" content={theme.colors.primary}/>*/}
            {/*    <meta name="viewport" content="initial-scale=1, width=device-width"/>*/}
            {/*</Head>*/}

            <main className={style.container}>
                <WithDataContext data={data} inflationData={inflationData}>
                    <Header/>
                    <Content filterState={filterState} setFilterState={setFilterState}/>
                    <Footer/>
                </WithDataContext>
            </main>
        </>
    );
}

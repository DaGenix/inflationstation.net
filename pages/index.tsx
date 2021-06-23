import DATA from '../src/util/data';
import {DataType, DataItemType} from '../src/util/data';
import {useEffect, useMemo, useState} from "react";
import Head from "next/head";
import sleep from "../src/util/sleep";
import {useRouter} from "next/router";

export async function getStaticProps(context) {
    return {
        props: {
            data: DATA,
        },
    }
}

interface ConsoleCardProps {
    item: DataItemType,
}

function ConsoleCard(props: ConsoleCardProps) {
    const {item} = props;
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 console-item">
            <div className="shadow bg-white rounded h-100 console-content">
                <a href={item.link}>
                    <picture>
                        <source srcSet={`
                                ${item.img200Webp} 200w,
                                ${item.img400Webp} 400w,
                                ${item.img600Webp} 600w,
                                ${item.img800Webp} 800w,
                                ${item.img1600Webp} 1600w
                                `}
                            sizes="(max-width: 576px) 80vw, 200px"
                            type="image/webp"
                        />
                        <img className="console-img"
                             alt={`Picture of ${item.name}`}
                             srcSet={`
                                 ${item.img200Jpeg} 200w,
                                 ${item.img400Jpeg} 400w,
                                 ${item.img600Jpeg} 600w,
                                 ${item.img800Jpeg} 800w,
                                 ${item.img1600Jpeg} 1600w
                                 `}
                             sizes="(max-width: 576px) 70vw, 200px"
                             src={item.img200Jpeg}
                        />
                    </picture>
                </a>
                <ul className="list-unstyled">
                    <li><h1>${item.price}</h1></li>
                    <li>{item.name} ({item.year})</li>
                    <li>Original Price: ${item.orig_price}</li>
                </ul>
            </div>
        </div>
    );
}

function setUrl(router, filter, include, orderBy, order) {
    if (filter === "" && include === "all" && orderBy === "year" && order === "asc") {
        router.replace("/");
    } else {
        const query = new URLSearchParams([
            ["filter", filter],
            ["include", include],
            ["orderBy", orderBy],
            ["order", order],
        ]).toString();
        router.replace("/?" + query);
    }
}

interface HomePageProps {
    data: DataType,
}

export default function HomePage(props: HomePageProps) {
    const {data} = props;

    const [displayFilter, setDisplayFilter] = useState("");

    const router = useRouter();

    const filter = (router.query.filter as string | undefined) || "";
    const include = router.query.include || "all";
    const orderBy = router.query.orderBy || "year";
    const order = router.query.order || "asc";

    const items = useMemo(() =>
        {
            const items = data.data
                .filter(item => {
                    if (filter === "") {
                        return true;
                    } else {
                        return item.name.toLowerCase().includes(filter) || item.manufacturer.toLowerCase().includes(filter);
                    }
                })
                .filter(item => {
                    if (include === "all") {
                        return true;
                    } else {
                        return item.type === "hybrid" || item.type === include;
                    }
                })
                .sort((a, b) => {
                    switch (orderBy) {
                        case "year": return a.year - b.year;
                        case "price": return a.raw_price - b.raw_price;
                        case "orig-price": return a.raw_orig_price - b.raw_orig_price;
                        case "manufacturer": return a.manufacturer.localeCompare(b.manufacturer);
                        default: throw new Error(`Unexpected orderBy value: ${orderBy}`);
                    }
                });
            if (order === "desc") {
                items.reverse();
            }
            return items;
        },
        [data.data, filter, include, orderBy, order]);

    useEffect(() => {
            const {promise, cancel} = sleep(250);
            promise.then(() => setUrl(router, displayFilter, include, orderBy, order));
            return cancel;
        },
        [displayFilter]);

    const onSetDisplayFilter = e => setDisplayFilter(e.target.value);
    const onSetInclude = e => setUrl(router, filter, e.target.value, orderBy, order);
    const onSetOrderBy = e => setUrl(router, filter, include, e.target.value, order);
    const onSetAscending = e => setUrl(router, filter, include, orderBy, e.target.value);

    const cards = items.map(item => <ConsoleCard key={item.name} item={item} />);

    return (
        <>
            <Head>
                <title>Console prices adjusted for inflation</title>
                <noscript>
                    <style>
                        {".hide-without-js { display: none !important; }"}
                    </style>
                </noscript>
            </Head>

            <header>
                <h1>Console prices adjusted for inflation</h1>
            </header>

            <main>
                <div id="filterbar" className="hide-without-js container mt-1">
                    <div id="filterbar-filter">
                        <label htmlFor="filter" className="sr-only">Filter</label>
                        <input type="text" placeholder="Filter" value={displayFilter} onChange={onSetDisplayFilter} />
                    </div>

                    <div id="filterbar-include">
                        <label htmlFor="filter-type" className="ml-md-1">Include:</label>
                        <select id="filter-type" value={include} onChange={onSetInclude}>
                            <option value="all">All</option>
                            <option value="home">Home</option>
                            <option value="handheld">Handheld</option>
                        </select>
                    </div>

                    <div id="filterbar-order">
                        <label htmlFor="sort-by" className="ml-md-1">Order By:</label>
                        <select id="sort-by" value={orderBy} onChange={onSetOrderBy}>
                            <option value="year">Year</option>
                            <option value="price">Today's Price</option>
                            <option value="orig-price">Original Price</option>
                            <option value="manufacturer">Manufacturer</option>
                        </select>

                        <label htmlFor="sort-order" className="sr-only">Sort Order:</label>
                        <select id="sort-order" value={order} onChange={onSetAscending}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>

                <div className="container">
                    <div id="console-list" className="row console-row">
                        {cards}
                    </div>
                </div>
            </main>

            <footer>
                <div className="container">
                <ul className="list-unstyled">
                <li>Wii U image by <a href="https://commons.wikimedia.org/w/index.php?curid=23214469">Takimata</a></li>
                <li>Xbox Series X and Xbox Series S image appear to be stock images, but I'm not sure of the source.</li>
                <li>PS5 and PS5 Digital Edition images from <a href="https://www.playstation.com/en-us/ps5/">Sony</a></li>
                <li>All other console images by <a href="https://commons.wikimedia.org/wiki/User:Evan-Amos" title="User:Evan-Amos">Evan-Amos</a></li>
                <li>PS5 and PS5 Digital Edition prices and release dates from <a href="https://en.wikipedia.org/wiki/PlayStation_5">Wikipedia</a></li>
                <li>Xbox Series X and Xbox Series S prices and release dates from <a href="https://en.wikipedia.org/wiki/Xbox_Series_X_and_Series_S">Wikipedia</a></li>
                <li>All Other Prices and release dates from <a href="http://vgsales.wikia.com/wiki/Launch_price">Video Game Sales Wiki</a></li>
                <li>Inflation data from <a href="https://www.bls.gov/data/inflation_calculator.htm">Consumer Price Index inflation calculator</a> and calculated for {data.inflation_month}, {data.inflation_year}</li>
                </ul>
                </div>
            </footer>
        </>
    );
}

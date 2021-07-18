import DATA from '../src/util/data';
import {DataType, DataItemType} from '../src/util/data';
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import Head from "next/head";
import sleep from "../src/util/sleep";
import {useRouter} from "next/router";
import {Box, FormControl, InputLabel, MenuItem, Paper, Select, TextField, useTheme} from "@material-ui/core";

export async function getStaticProps(context) {
    return {
        props: {
            data: DATA,
        },
    }
}

type ConsoleCardProps = {
    item: DataItemType,
}

function ConsoleCard(props: ConsoleCardProps) {
    const theme = useTheme();
    const {item} = props;
    return (
        <Paper sx={{textAlign: "center", p: 1}}>
            <a href={item.link}>
                <picture>
                    <source srcSet={`
                            ${item.img200Webp} 200w,
                            ${item.img400Webp} 400w,
                            ${item.img600Webp} 600w,
                            ${item.img800Webp} 800w,
                            ${item.img1600Webp} 1600w
                            `.replace(/\s+/gs, " ")}
                        sizes={`(max-width: ${theme.breakpoints.values["sm"]}px) 70vw, 200px`}
                        type="image/webp"
                    />
                    <img
                         alt={`Picture of ${item.name}`}
                         srcSet={`
                             ${item.img200Jpeg} 200w,
                             ${item.img400Jpeg} 400w,
                             ${item.img600Jpeg} 600w,
                             ${item.img800Jpeg} 800w,
                             ${item.img1600Jpeg} 1600w
                             `.replace(/\s+/gs, " ")}
                         sizes={`(max-width: ${theme.breakpoints.values["sm"]}px) 70vw, 200px`}
                         src={item.img200Jpeg}
                    />
                </picture>
            </a>
            <Box component="ul" sx={{listStyle: "none", p: 0, m: 0}}>
                <li><h1>${item.prices.join("/$")}</h1></li>
                <li>{item.name} ({item.year})</li>
                <li>Original Price(s): ${item.orig_prices.join("/$")}</li>
            </Box>
        </Paper>
    );
}

function setUrl(router, filter, include, orderBy, order) {
    if (filter === "" && include === "all" && orderBy === "year" && order === "desc") {
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

const FooterLink = (props) => {
    const {children, ...attribs} = props;
    return (
        <Box
            component="a"
            sx={{
                color: "white",
                textDecoration: "underline",
                fontWeight: 700,
                ":hover": {
                    color: "white",
                    fontWeight: 700,
                }
            }}
            {...attribs}
        >
            {children}
        </Box>
    )
}

type HomePageProps = {
    data: DataType,
}

export default function HomePage(props: HomePageProps) {
    const {data} = props;

    const router = useRouter();

    const [initialRender, setInitialRender] = useState(true)

    let query;
    if (initialRender || typeof window === "undefined") {
        // The server render and the initial render have to match up
        query = new URLSearchParams();
    } else {
        query = new URLSearchParams(window.location.search);
    }

    const filter = query.get("filter") || "";
    const include = query.get("include") || "all";
    const orderBy = query.get("orderBy") || "year";
    const order = query.get("order") || "desc";

    const [displayFilter, setDisplayFilter] = useState(filter);

    // On the browser, we have to force a re-render so that we can hide
    // the appropriate console entries depending on URL params.
    if (typeof window !== "undefined") {
        useLayoutEffect(() => {
            setInitialRender(false);
            setDisplayFilter(new URLSearchParams(window.location.search).get("filter") || "");
        }, []);
    }

    const items = useMemo(() =>
        {
            const items = data.data
                .filter(item => {
                    if (filter === "") {
                        return true;
                    } else {
                        return item.name.toLowerCase().includes(filter.toLowerCase()) || item.manufacturer.toLowerCase().includes(filter.toLowerCase());
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
                        case "price": return a.raw_prices[0] - b.raw_prices[0];
                        case "orig-price": return a.raw_orig_prices[0] - b.raw_orig_prices[0];
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
            if (initialRender || displayFilter === filter) {
                return;
            }
            const {promise, cancel} = sleep(250);
            promise.then(() => {
                setUrl(router, displayFilter, include, orderBy, order)
            });
            return cancel;
        },
        [router, initialRender, displayFilter, filter, include, orderBy, order]);

    const onSetDisplayFilter = e => setDisplayFilter(e.target.value);
    const onSetInclude = e => setUrl(router, filter, e.target.value, orderBy, order);
    const onSetOrderBy = e => setUrl(router, filter, include, e.target.value, order);
    const onSetAscending = e => setUrl(router, filter, include, orderBy, e.target.value);

    const cards = items.map(item => <ConsoleCard key={item.name} item={item} />);

    return (
        <>
            <Head>
                <title>Console Prices Adjusted for Inflation</title>
                <meta name="description" content="Game console prices adjusted for inflation" />
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

            <header>
                <Box
                    sx={{
                        color: "white",
                        backgroundColor: "#6c4d70",
                        textAlign: "center",
                        py: 2,
                    }}
                >
                    <h1>Console Prices Adjusted for Inflation</h1>
                </Box>
            </header>

            <Box component="main" sx={{
                backgroundColor: "#f1f1f1",
            }}
            >
                <Box
                    className="hide-without-js"
                    sx={{
                        pr: 1,
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "flex-end",
                        alignItems: "baseline",
                        gap: 1,
                    }}
                >
                    <TextField
                        size="small"
                        margin="dense"
                        placeholder="Filter"
                        label="Filter"
                        value={displayFilter}
                        onChange={onSetDisplayFilter}
                    />
                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select
                            label="Type"
                            size="small"
                            margin="dense"
                            value={include}
                            onChange={onSetInclude}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="home">Home</MenuItem>
                            <MenuItem value="handheld">Handheld</MenuItem>
                        </Select>
                    </FormControl>

                    <Box
                        sx={{
                            display: "flex",
                            flexFlow: "row nowrap",
                            alignItems: "baseline",
                            gap: 1,
                        }}
                    >
                        <FormControl>
                            <InputLabel>Sort</InputLabel>
                            <Select
                                label="Sort"
                                size="small"
                                margin="dense"
                                value={orderBy}
                                onChange={onSetOrderBy}
                            >
                                <MenuItem value="year">Year</MenuItem>
                                <MenuItem value="price">Today's Price</MenuItem>
                                <MenuItem value="orig-price">Original Price</MenuItem>
                                <MenuItem value="manufacturer">Manufacturer</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel>Order</InputLabel>
                            <Select
                                label="Order"
                                size="small"
                                margin="dense"
                                value={order}
                                onChange={onSetAscending}
                            >
                                <MenuItem value="asc">Ascending</MenuItem>
                                <MenuItem value="desc">Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box
                    sx={{
                        // width: "100%",
                        p: 1,
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(auto-fill, minmax(250px, 1fr))",
                        },
                        gap: 1,
                    }}
                >
                    {cards}
                </Box>
            </Box>

            <Box component="footer" sx={{
                backgroundColor: "#777777",
                color: "white",
            }}>
                <Box component="ul" sx={{
                    py: 2,
                    px: 3,
                    m: 0,
                }}>
                    <li>Wii U image by <FooterLink href="https://commons.wikimedia.org/w/index.php?curid=23214469">Takimata</FooterLink></li>
                    <li>Xbox Series X and Xbox Series S image appear to be stock images, but I'm not sure of the source.</li>
                    <li>PS5 and PS5 Digital Edition images from <FooterLink href="https://www.playstation.com/en-us/ps5/">Sony</FooterLink></li>
                    <li>PS5 and PS5 Digital Edition prices and release dates from <FooterLink href="https://en.wikipedia.org/wiki/PlayStation_5">Wikipedia</FooterLink></li>
                    <li>Xbox Series X and Xbox Series S prices and release dates from <FooterLink href="https://en.wikipedia.org/wiki/Xbox_Series_X_and_Series_S">Wikipedia</FooterLink></li>
                    <li>Switch Lite image by <FooterLink href="https://commons.wikimedia.org/wiki/File:Nintendo_Switch_Lite_representation.png">GerdeeX</FooterLink></li>
                    <li>Steam Deck picture taken (and lightly touched up) from a video on the <FooterLink href="https://www.steamdeck.com/">Steam Deck Home Page</FooterLink></li>
                    <li>All other console images by <FooterLink href="https://commons.wikimedia.org/wiki/User:Evan-Amos" title="User:Evan-Amos">Evan-Amos</FooterLink></li>
                    <li>All other prices and release dates from <FooterLink href="http://vgsales.wikia.com/wiki/Launch_price">Video Game Sales Wiki</FooterLink></li>
                    <li>Inflation data from <FooterLink href="https://www.bls.gov/data/inflation_calculator.htm">Consumer Price Index inflation calculator</FooterLink> and calculated for {data.inflation_month}, {data.inflation_year}</li>
                </Box>
            </Box>
        </>
    );
}

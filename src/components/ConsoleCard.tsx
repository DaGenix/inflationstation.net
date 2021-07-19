import {DataItemType} from "../util/data";
import {Box, Paper, useTheme} from "@material-ui/core";

type ConsoleCardProps = {
    item: DataItemType,
}

export default function ConsoleCard(props: ConsoleCardProps) {
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

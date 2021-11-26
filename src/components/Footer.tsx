import {DataType} from "../util/data";
import React from "react";
import {styled} from "linaria/react";

const FooterLink = styled.a`
    color: white;
    text-decoration: underline;
    font-weight: 700;
    
    &:hover {
        color: white;
        font-weight: 700;
    }
`;

const FooterBackground = styled.footer`
    background: linear-gradient(45deg, #2c0659, #4A148C);
    box-shadow: 0 0 8px black;
    color: white;
    padding: 16px 16px 16px 0;
`;

type FooterProps = {
    data: DataType,
}

export default function Footer(props: FooterProps) {
    const {data} = props;
    return (
        <FooterBackground>
            <ul>
                <li>Wii U image by <FooterLink
                    href="https://commons.wikimedia.org/w/index.php?curid=23214469">Takimata</FooterLink></li>
                <li>Xbox Series X and Xbox Series S image appear to be stock images, but I'm not sure of the source.
                </li>
                <li>PS5 and PS5 Digital Edition images from <FooterLink
                    href="https://www.playstation.com/en-us/ps5/">Sony</FooterLink></li>
                <li>PS5 and PS5 Digital Edition prices and release dates from <FooterLink
                    href="https://en.wikipedia.org/wiki/PlayStation_5">Wikipedia</FooterLink></li>
                <li>Xbox Series X and Xbox Series S prices and release dates from <FooterLink
                    href="https://en.wikipedia.org/wiki/Xbox_Series_X_and_Series_S">Wikipedia</FooterLink></li>
                <li>Switch Lite image by <FooterLink
                    href="https://commons.wikimedia.org/wiki/File:Nintendo_Switch_Lite_representation.png">GerdeeX</FooterLink>
                </li>
                <li>Steam Deck picture taken (and lightly touched up) from a video on the <FooterLink
                    href="https://www.steamdeck.com/">Steam Deck Home Page</FooterLink></li>
                <li>All other console images by <FooterLink href="https://commons.wikimedia.org/wiki/User:Evan-Amos"
                                                            title="User:Evan-Amos">Evan-Amos</FooterLink></li>
                <li>All other prices and release dates from <FooterLink
                    href="http://vgsales.wikia.com/wiki/Launch_price">Video Game Sales Wiki</FooterLink></li>
                <li>Inflation data from <FooterLink href="https://www.bls.gov/data/inflation_calculator.htm">Consumer
                    Price Index inflation calculator</FooterLink> and calculated
                    for {data.inflation_month}, {data.inflation_year}</li>
            </ul>
        </FooterBackground>
    );
};

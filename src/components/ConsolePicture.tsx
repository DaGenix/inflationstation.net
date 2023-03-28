import {DataItemType} from "../util/loadData";
import style from "./ConsolePicture.module.scss";

type ConsolePictureProps = {
    item: DataItemType,
    lazyLoad: boolean,
}

function ConsolePicture(props: ConsolePictureProps) {
    const {item, lazyLoad} = props;
    return (
        <a href={item.link}>
            <picture>
                <source srcSet={`
                            ${item.img300Webp} 1x,
                            ${item.img600Webp} 2x,
                            ${item.img900Webp} 3x,
                            ${item.img1200Webp} 4x,
                            ${item.img1800Webp} 6x
                            `.replace(/\s+/gs, " ")}
                        type="image/webp"
                />
                <img
                    alt={`Picture of ${item.names[0]}`}
                    srcSet={`
                             ${item.img300Jpeg} 1x,
                             ${item.img600Jpeg} 2x,
                             ${item.img900Jpeg} 3x,
                             ${item.img1200Jpeg} 4x,
                             ${item.img1800Jpeg} 6x
                             `.replace(/\s+/gs, " ")}
                    src={item.img300Jpeg}
                    width="300"
                    height="150"
                    className={style.imgClass}
                    loading={lazyLoad ? "lazy" : undefined}
                />
            </picture>
        </a>
    )
}

export default ConsolePicture;

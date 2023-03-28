import {DataType, InflationData, loadClientData} from "../util/loadData";
import ConsolePicture from "./ConsolePicture";
import CardContainer from "./CardContainer";

type MainProps = {
    data: DataType,
    inflationData: InflationData,
}

export default function Main(props: MainProps) {
    const {data, inflationData} = props;
    const consolePictures = data.data.map((item, index) => {
        return <ConsolePicture item={item} lazyLoad={false} />
    });
    return (
        <main>
            <CardContainer
                data={loadClientData()}
                inflationData={inflationData}
                consolePictures={consolePictures}
            />
        </main>
    )
}

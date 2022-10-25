import {loadData, loadInflationData} from "../src/util/loadData";
import Inner from "./Inner";

export default function HomePage() {
    const data = loadData();
    const inflationData = loadInflationData();
    return <Inner
        data={data}
        inflationData={inflationData}
    />;
}

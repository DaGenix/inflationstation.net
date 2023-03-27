import {loadData, loadInflationData} from "../src/util/loadData";
import Inner from "./Inner";

import "./root.scss"

export default function HomePage() {
    const data = loadData();
    const inflationData = loadInflationData();
    return <Inner
        data={data}
        inflationData={inflationData}
    />;
}

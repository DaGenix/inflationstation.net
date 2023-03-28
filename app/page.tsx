import {loadData, loadInflationData} from "../src/util/loadData";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Main from "../src/components/Main";

export default function HomePage() {
    const data = loadData();
    const inflationData = loadInflationData();
    return (
        <>
            <Header data={data} inflationData={inflationData} />
            <Main data={data} inflationData={inflationData} />
            <Footer data={data} />
        </>
    )
}

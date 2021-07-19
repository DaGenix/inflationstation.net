import {useEffect, useState} from "react";

export default function useUrlSearchParams(): [boolean, URLSearchParams, (URLSearchParams) => void] {
    const [renderNum, setRenderNum] = useState(1);

    useEffect(() => setRenderNum(renderNum + 1), []);

    const setUrlSearchParams = (urlParams: URLSearchParams) => {
        const q = urlParams.toString();
        window.history.replaceState(null, document.title, q.length > 0 ? "/?" + q : "/");
        setRenderNum(renderNum + 1);
    }

    if (renderNum === 1 || typeof window === "undefined") {
        return [renderNum === 1, new URLSearchParams(), setUrlSearchParams];
    } else {
        return [renderNum === 1, new URLSearchParams(window.location.search), setUrlSearchParams];
    }
}

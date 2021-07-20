import {useEffect, useState} from "react";

export default function useUrlSearchParams(): [string, URLSearchParams, (URLSearchParams) => void] {
    const [componentKey, setComponentKey] = useState("default");
    const [urlSearchParams, setUrlSearchParams] = useState(new URLSearchParams());

    useEffect(() => {
            if (window.location.search !== "") {
                setUrlSearchParams(new URLSearchParams(window.location.search));
                setComponentKey("updated");
            }
        },
        []);

    const setter = (urlParams: URLSearchParams) => {
        setUrlSearchParams(urlParams);
        const q = urlParams.toString();
        window.history.replaceState(null, document.title, q.length > 0 ? "/?" + q : "/");
    }

    return [componentKey, urlSearchParams, setter];
}

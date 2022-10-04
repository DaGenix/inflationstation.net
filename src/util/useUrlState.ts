import {useCallback, useEffect, useRef, useState} from "react";
import shallowEqual from "./shallowEqual";

export default function useUrlState<S>(
    initialValue: S,
    deserializeState: (URLSearchParams) => S,
    serializeState: (S) => URLSearchParams,
): [S, (S) => void] {
    const [cachedQuery, setCachedQuery] = useState("");
    const timerRef = useRef<number>();

    useEffect(() => {
            setCachedQuery(window.location.search);

            return () => {
                if (typeof timerRef.current !== "undefined") {
                    window.clearTimeout(timerRef.current);
                    timerRef.current = undefined;
                }
            }
        },
        [])

    const setUrlState = useCallback((state) => {
        if (typeof timerRef.current !== "undefined") {
            clearTimeout(timerRef.current);
            timerRef.current = undefined;
        }
        if (shallowEqual(state, initialValue)) {
            setCachedQuery("")
            timerRef.current = window.setTimeout(() => window.history.replaceState(null, document.title, "/"), 250);
        } else {
            const query = serializeState(state).toString();
            setCachedQuery(query);
            timerRef.current = window.setTimeout(() => window.history.replaceState(null, document.title, "/?" + query), 250);
        }
    }, [initialValue, serializeState]);

    const urlState = deserializeState(new URLSearchParams(cachedQuery));

    return [urlState, setUrlState];
}

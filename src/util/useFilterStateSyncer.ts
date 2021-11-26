import {FilterState, UpdateFilterState} from "./useFilterState";
import {useEffect, useState} from "react";
import {makeUrlSearchParams, parseUrlSearchParams} from "./urlUtil";

const useFilterStateSyncer = (filterState: FilterState, updateFilterState: UpdateFilterState) => {
    const [initial, setInitial] = useState(true);

    useEffect(
        () => {
            if (initial) {
                setInitial(false);
                if (window.location.search !== "") {
                    updateFilterState(parseUrlSearchParams(new URLSearchParams(window.location.search)));
                }
            }
        }, [initial, setInitial])

    useEffect(
        () => {
            if (!initial) {
                const p = makeUrlSearchParams(filterState.filter, filterState.include, filterState.orderBy, filterState.order);
                const q = p.toString();
                window.history.replaceState(null, document.title, q.length > 0 ? "/?" + q : "/");
            }
        }, [initial, filterState])
}

export default useFilterStateSyncer;

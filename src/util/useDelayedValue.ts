import {useEffect, useState} from "react";
import sleep from "./sleep";

export default function useDelayedValue<T>(updatedValue: T, delayMs: number): T {
    const [visibleValue, setVisibleValue] = useState(updatedValue);

    useEffect(() => {
            if (visibleValue !== updatedValue) {
                const {promise, cancel} = sleep(delayMs);
                promise.then(() => setVisibleValue(updatedValue));
                return cancel;
            }
        },
        [visibleValue, updatedValue]
    );

    return visibleValue;
}

const sleep = (millis: number): { promise: Promise<null>, cancel: () => void } => {
    let cancel;
    let resolved = false;
    const promise: Promise<null> = new Promise(resolve => {
            const timeoutID = setTimeout(resolve, millis);
            cancel = () => {
                if (!resolved) {
                    clearTimeout(timeoutID);
                }
            }
        }
    );
    promise.then(() => resolved = true);
    return {promise, cancel};
}

export default sleep;

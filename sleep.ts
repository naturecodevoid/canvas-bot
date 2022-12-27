export function sleep(ms: number) {
    return new Promise<void>((resolve) => {
        if (ms <= 0) return resolve();
        setTimeout(resolve, ms);
    });
}

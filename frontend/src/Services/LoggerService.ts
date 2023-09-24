export function log(_log: any) {
    if (process.env.REACT_APP_LOGGING == 'true') {
        console.log(_log);
    }
}
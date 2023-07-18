export interface AppLogLine {
    time: Date;
    user: string;
    logType: 'USER ACTION' | 'APP LOG' | 'REST API CALL';
    requestURL: string;
    requestType: string;
    result: string;
}
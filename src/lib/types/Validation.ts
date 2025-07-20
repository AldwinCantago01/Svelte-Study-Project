type Result = 'SUCCESS' | 'FAIL';
export type ResultObject = {
    result: Result;
    message: string
}

export const SUCCESS: Result = 'SUCCESS';
export const FAIL: Result = 'FAIL';
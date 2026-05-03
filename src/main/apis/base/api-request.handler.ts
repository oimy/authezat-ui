import {AxiosError, type AxiosResponse} from "axios";

const ISO8601_PATTERN: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

export function handleSuccess(response: AxiosResponse) {
    const applyDateType = (value: unknown): unknown => {
        if (Array.isArray(value)) return value.map(applyDateType);
        if (value && typeof value === "object") {
            const record = value as Record<string, unknown>;
            for (const key of Object.keys(value)) {
                record[key] = applyDateType(record[key]);
            }
            return record;
        }
        if (typeof value === "string" && ISO8601_PATTERN.test(value)) {
            return new Date(value);
        }
        return value;
    };

    response.data = applyDateType(response.data);
    return response;
}

export function handleError(error: AxiosError) {
    if (!error.response) {
        return Promise.reject(error);
    }

    if (error.response.status == 401 || error.response.status == 403) {
        window.location.href = '/auth/signin';
    }
    if (error.response.status == 500) {
        window.location.href = "/error/found";
    }
    return Promise.reject(error);
}
import type {AxiosResponse} from "axios";

export interface ApiRequestArgumentType<P extends Record<string, unknown>, Q, B> {
    path?: P;
    query?: Q;
    body?: B;
    header?: Record<string, string>;
}

export type ApiRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequest<P extends Record<string, unknown>, Q, B, R> {
    request: (requestArgument: ApiRequestArgumentType<P, Q, B>) => Promise<AxiosResponse<unknown, never>>;
    convertResponse: (content: never) => R;
}

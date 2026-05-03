import axios, {type AxiosInstance} from "axios";
import type {ApiRequest, ApiRequestArgumentType, ApiRequestMethod} from "./models.ts";
import {handleError, handleSuccess} from "./api-request.handler.ts";


export class ApiRequestBuilder<P extends Record<string, unknown>, Q, B, R> {
    private readonly api: AxiosInstance;
    private readonly method: ApiRequestMethod;
    private readonly headers: Record<string, string>;
    private readonly path: (kwargs: P) => string;
    private readonly convertResponse: (content: never) => R;

    constructor(api: AxiosInstance, method: ApiRequestMethod, headers: Record<string, string>, path: (kwargs: P) => string, convertResponse: (content: never) => R) {
        this.api = api;
        this.method = method;
        this.headers = headers;
        this.path = path;
        this.convertResponse = convertResponse;
    }

    setMethod(method: ApiRequestMethod) {
        return new ApiRequestBuilder<P, Q, B, R>(this.api, method, this.headers, this.path, this.convertResponse);
    }

    setPath<P extends Record<string, unknown>>(path: (kwargs: P) => string) {
        return new ApiRequestBuilder<P, Q, B, R>(this.api, this.method, this.headers, path, this.convertResponse);
    }

    setQuery<Q>() {
        return new ApiRequestBuilder<P, Q, B, R>(this.api, this.method, this.headers, this.path, this.convertResponse);
    }

    setBody<B>() {
        return new ApiRequestBuilder<P, Q, B, R>(this.api, this.method, this.headers, this.path, this.convertResponse);
    }

    setResponse<R>() {
        const genericMatchResponse = (content: never) => this.convertResponse(content) as unknown as R;
        return new ApiRequestBuilder<P, Q, B, R>(this.api, this.method, this.headers, this.path, genericMatchResponse);
    }

    setResponseConvert<R>(convertResponse: (content: never) => R) {
        return new ApiRequestBuilder<P, Q, B, R>(this.api, this.method, this.headers, this.path, convertResponse);
    }

    build(): ApiRequest<P, Q, B, R> {
        return {
            request: (requestArgument: ApiRequestArgumentType<P, Q, B>) => {
                const completedPath = requestArgument.path ? this.path(requestArgument.path) : this.path({} as P);

                return this.api.request({
                    url: completedPath ? completedPath : "",
                    method: this.method,
                    headers: {...this.headers, ...requestArgument.header},
                    params: requestArgument.query || {},
                    data: requestArgument.body || {},
                });
            },
            convertResponse: this.convertResponse,
        };
    }
}

export const createApiRequestBuilder = ({
    basePath,
    method = "GET",
    header = {},
}: {
    basePath: string;
    method?: ApiRequestMethod;
    header?: Record<string, string>;
}) => {
    const api: AxiosInstance = axios.create({baseURL: basePath});
    api.interceptors.response.use(handleSuccess, handleError);

    return new ApiRequestBuilder<Record<string, unknown>, undefined, undefined, unknown>(api, method, header, () => "", (content) => content);
};

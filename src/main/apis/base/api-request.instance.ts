import {createApiRequestBuilder} from "./api-request.builder.ts";

export const AuthezatApiRequestBuilder = () => createApiRequestBuilder({basePath: '/api/authezat/v1'});
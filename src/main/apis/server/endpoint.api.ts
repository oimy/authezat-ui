import {AuthezatApiRequestBuilder} from "../base/api-request.instance.ts";
import type {Endpoint, EndpointSave, Server} from "./models.ts";

export const getServers = AuthezatApiRequestBuilder()
    .setPath(() => `/server/servers`)
    .setResponse<Server[]>()
    .build();

export const getEndpointsByServerSrl = AuthezatApiRequestBuilder()
    .setPath<{ serverSrl: number }>(({serverSrl}) => `/server/servers/${serverSrl}/endpoints`)
    .setResponse<Endpoint[]>()
    .build();

export const postEndpointsByServerSrl = AuthezatApiRequestBuilder()
    .setPath(() => `/server/servers`)
    .setMethod("POST")
    .setBody<EndpointSave>()
    .build();
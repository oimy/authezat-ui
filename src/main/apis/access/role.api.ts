import {AuthezatApiRequestBuilder} from "../base/api-request.instance.ts";
import type {Role} from "./models.ts";

export const getRolesByEndpointSrl = AuthezatApiRequestBuilder()
    .setPath<{ endpointSrl: number }>(({endpointSrl}) => `/server/endpoints/${endpointSrl}/roles`)
    .setResponse<Role[]>()
    .build();

export const getAllRoles = AuthezatApiRequestBuilder()
    .setPath(() => `/access/roles`)
    .setResponse<Role[]>()
    .build();
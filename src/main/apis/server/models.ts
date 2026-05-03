import type {Role} from "../access/models.ts";

export interface Server {
    srl: number;
    name: string;
    url: string;
    version: number;
}

export type EndpointMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Endpoint {
    serverSrl: number;
    method: EndpointMethod;
    path: string;
    roles: Role[];
}

export interface EndpointSave {
    method: EndpointMethod;
    path: string;
}
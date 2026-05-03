import type {ReactNode} from "react";
import EndpointPage from "./main/pages/server/endpoint";

export interface RouteMilestone {
    title: string;
    path: string;
    page: () => ReactNode;
}

export const ROUTE_MILESTONES: RouteMilestone[] = [
    {
        title: "엔드포인트 관리",
        path: "/server/endpoint",
        page: EndpointPage,
    },
];
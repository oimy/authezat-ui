import type {EndpointMethod} from "../../../apis/server/models.ts";

export const getColorByMethod = (method: EndpointMethod): string => {
    switch (method) {
        case 'GET': return "#3B82F6";
        case 'POST': return "#10B981";
        case 'PUT': return "#8B5CF6";
        case 'PATCH': return "#3B82F6";
        case 'DELETE': return "#EF4444";
    }
    return "#333333";
}
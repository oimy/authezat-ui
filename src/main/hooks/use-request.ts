import { useCallback, useState } from "react";
import type {ApiRequest, ApiRequestArgumentType} from "../apis/base/models.ts";

interface FetchRequest<P extends Record<string, unknown>, Q, B, D> {
    loading: boolean;
    fetch: (config: ApiRequestArgumentType<P, Q, B>) => Promise<D>;
}

export default  <P extends Record<string, unknown>, Q, B, D>(
    apiRequest: ApiRequest<P, Q, B, D>
): FetchRequest<P, Q, B, D> => {
    const [loading, setLoading] = useState(false);

    const fetch = useCallback(
        async (config: ApiRequestArgumentType<P, Q, B>) => {
            setLoading(true);
            try {
                const response = await apiRequest.request(config);
                return apiRequest.convertResponse(response.data as never);
            } finally {
                setLoading(false);
            }
        },
        [apiRequest]
    );

    return {
        loading,
        fetch,
    };
};

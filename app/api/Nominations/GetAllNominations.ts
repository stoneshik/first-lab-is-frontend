import { api } from "~/lib/axios";

import { type ErrorMessage } from "~/types/ErrorMessage";
import type { WrapperListNomination } from "~/types/nomination/WrapperListNomination";

export interface ParamsForGetWrapperListNomination {
    page: number;
    size: number;
}

export const getWrapperListNomination = async ({
    page,
    size,
}: ParamsForGetWrapperListNomination): Promise<WrapperListNomination | ErrorMessage> => {
    try {
        const params: Record<string, number> = {
            page,
            size,
        };
        const response = await api.get("/nominations", { params });
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as WrapperListNomination;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            // @ts-ignore
            const status = error.response?.status;
            // @ts-ignore
            const data = error.response?.data;
            throw new Error(`Серверная ошибка ${status}: ${JSON.stringify(data)}`);
        }
        throw new Error(String(error));
    }
};

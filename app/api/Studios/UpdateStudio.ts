import { api } from "~/lib/axios";
import { isErrorMessage } from "~/types/ErrorMessage";
import type { Studio } from "~/types/studio/Studio";

export type ParamsForUpdateStudio = {
    id: number;
    name: string;
    address: string;
};

export const updateStudio = async (
    params: ParamsForUpdateStudio
): Promise<Studio> => {
    try {
        const response = await api.put<Studio>(`/studios/${params.id}`, {
            name: params.name,
            address: params.address,
        });
        return response.data;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            // @ts-ignore
            const status = error.response?.status;
            // @ts-ignore
            const data = error.response?.data;
            if (isErrorMessage(data)) { throw data; }
            throw new Error(`Серверная ошибка ${status}: ${JSON.stringify(data)}`);
        }
        throw new Error(String(error));
    }
}

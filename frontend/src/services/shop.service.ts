import api from "../utils/api";
import { IShop } from "@/src/types/shop.types"

const shopService = {
    createShop: async (data: Partial<IShop>): Promise<IShop> => {
        const res = await api.post("/shops", data);
        return res.data.shop;
    },

    getMyShop: async (): Promise<IShop> => {
        const res = await api.get("/shops/my");
        return res.data.shop;
    },

    updateShop: async (data: Partial<IShop>): Promise<IShop> => {
        const res = await api.put("/shops", data);
        return res.data.shop;
    },

    deleteShop: async (): Promise<void> => {
        await api.delete("/shops");
    },

    getShopBySlug: async (slug: string): Promise<IShop> => {
        const res = await api.get(`/shops/${slug}`);
        return res.data.shop;
    },
};


export default shopService;
import api from "../utils/api";

export interface IAnalytics {
    totalOrders: number;
    totalInventory: number;
    totalLeads: number;
    totalCalls: number;
    lowStockCount: number;
}

const analyticsService = {
    getStats: async (): Promise<IAnalytics> => {
        const res = await api.get("/analytics");
        return res.data.stats;
    },
};

export default analyticsService;

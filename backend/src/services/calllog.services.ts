import CallLog from "../models/CallLog.models.js";

/* ─────────────────────────────────────────
   Get All Call Logs
───────────────────────────────────────── */
export const getCallLogsService = async (shopId: string) => {
  return await CallLog.find({ shop: shopId }).sort({ createdAt: -1 });
};

/* ─────────────────────────────────────────
   Get Single Call Log
───────────────────────────────────────── */
export const getCallLogByIdService = async (
  shopId: string,
  logId: string
) => {
  const log = await CallLog.findOne({ _id: logId, shop: shopId });
  if (!log) throw new Error("Call log not found");
  return log;
};
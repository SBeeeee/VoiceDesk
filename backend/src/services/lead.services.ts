import Lead from "../models/leads.models.js";

/* ─────────────────────────────────────────
   Get All Leads
───────────────────────────────────────── */
export const getLeadsService = async (
  shopId: string,
  status?: string
) => {
  const filter: any = { shop: shopId };
  if (status) filter.status = status;

  return await Lead.find(filter).sort({ createdAt: -1 });
};

/* ─────────────────────────────────────────
   Update Lead Status
───────────────────────────────────────── */
export const updateLeadStatusService = async (
  shopId: string,
  leadId: string,
  status: "NEW" | "CONTACTED" | "CONVERTED"
) => {
  const lead = await Lead.findOneAndUpdate(
    { _id: leadId, shop: shopId },
    { status },
    { new: true }
  );

  if (!lead) throw new Error("Lead not found");
  return lead;
};

/* ─────────────────────────────────────────
   Delete Lead
───────────────────────────────────────── */
export const deleteLeadService = async (
  shopId: string,
  leadId: string
) => {
  const lead = await Lead.findOneAndDelete({
    _id: leadId,
    shop: shopId
  });

  if (!lead) throw new Error("Lead not found");
};
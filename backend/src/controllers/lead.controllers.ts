import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middlewares.js";
import { getLeadsService, updateLeadStatusService, deleteLeadService } from "../services/lead.services.js";

export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { status } = req.query;
    const leads = await getLeadsService(shop._id.toString(), status as string);
    res.json({ success: true, data: leads });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateLeadStatus = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { leadId } = req.params;
    const { status } = req.body;
    
    const lead = await updateLeadStatusService(shop._id.toString(), leadId as string, status);
    res.json({ success: true, data: lead });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { leadId } = req.params;
    await deleteLeadService(shop._id.toString(), leadId as string);
    res.json({ success: true, message: "Lead deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

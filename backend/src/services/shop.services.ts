import Shop,{IShop} from "../models/shop.models.js"
import User from "../models/user.models.js"
import { createVapiAssistant,updateVapiAssistant,deleteVapiAssistant } from "../utils/vapi.js"


export const buildVoicePrompt = (shop: Partial<IShop>): string => {
  const servicesList =
    shop.services && shop.services.length > 0
      ? shop.services
          .map(
            (s) =>
              `- ${s.name}: ₹${s.price}${s.duration ? ` (${s.duration})` : ""}${
                s.shortDescription ? ` — ${s.shortDescription}` : ""
              }`
          )
          .join("\n")
      : "No services listed yet.";

  const hours = shop.businessHours
    ? `${shop.businessHours.days?.join(", ")} from ${shop.businessHours.open} to ${shop.businessHours.close}`
    : "Not specified";

  return `
You are a friendly voice receptionist for ${shop.name}.
${shop.subtitle ? `Tagline: ${shop.subtitle}` : ""}
${shop.description ? `About us: ${shop.description}` : ""}
${shop.address ? `Location: ${shop.address}` : ""}
${shop.phone ? `Contact: ${shop.phone}` : ""}

Business Hours: ${hours}

Our Services:
${servicesList}

Your responsibilities:
1. Greet customers warmly and introduce the shop.
2. Answer questions about services, pricing, and timings.
3. Check inventory if customer asks about product availability.
4. Place orders on behalf of the customer if they want to buy something.
5. Capture customer name and phone number as a lead if they are just enquiring.
6. Always be polite, concise, and professional.

If you don't know something, say "Let me check that for you" and use the available tools.
  `.trim();
};

export const createShopService = async (
  ownerId: string,
  data: Partial<IShop>
) => {
  const existing = await Shop.findOne({ owner: ownerId });
  if (existing) throw new Error("You already have a shop");

  const slug =
    (data.name as string)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") +
    "-" +
    Date.now();

  const voicePrompt = buildVoicePrompt(data);

  // ✅ Create shop first to get the _id
  const shop = await Shop.create({
    ...data,
    owner: ownerId,
    slug,
    voicePrompt,
  });

  // ✅ Now create Vapi assistant with the real shopId
  let vapiAssistant;
  try {
    vapiAssistant = await createVapiAssistant(
      data.name as string,
      voicePrompt,
      shop._id.toString()  // ← pass shopId
    );
    console.log("✅ VAPI Assistant created:", vapiAssistant.id);
  } catch (vapiError: any) {
    // Rollback shop if Vapi fails
    await Shop.findByIdAndDelete(shop._id);
    console.error("❌ VAPI Error:", vapiError.response?.data || vapiError.message);
    throw new Error(
      `Failed to create voice assistant: ${vapiError.response?.data?.message || vapiError.message}`
    );
  }

  // ✅ Update shop with vapiAssistantId
  shop.vapiAssistantId = vapiAssistant.id;
  await shop.save();

  await User.findByIdAndUpdate(ownerId, {
    store: shop._id,
    role: "shopkeeper",
  });

  return shop;
};

export const getMyShopService = async (ownerId: string) => {
  const shop = await Shop.findOne({ owner: ownerId });
  if (!shop) throw new Error("Shop not found");
  return shop;
};

export const getShopBySlugService = async (slug: string) => {
  const shop = await Shop.findOne({ slug, isActive: true }).select(
    "-vapiAssistantId -voicePrompt -owner"
  );
  if (!shop) throw new Error("Shop not found");
  return shop;
};

export const updateShopService = async (
  ownerId: string,
  updates: Partial<IShop>
) => {
  const shop = await Shop.findOne({ owner: ownerId });
  if (!shop) throw new Error("Shop not found");

  Object.assign(shop, updates);
  shop.voicePrompt = buildVoicePrompt(shop);

  if (shop.vapiAssistantId) {
    await updateVapiAssistant(
      shop.vapiAssistantId,
      shop.voicePrompt,
      shop._id.toString()  // ← pass shopId
    );
  }

  await shop.save();
  return shop;
};

/* ─────────────────────────────────────────
   Delete Shop
───────────────────────────────────────── */
export const deleteShopService = async (ownerId: string) => {
  const shop = await Shop.findOne({ owner: ownerId });
  if (!shop) throw new Error("Shop not found");

  // Delete Vapi assistant
  if (shop.vapiAssistantId) {
    await deleteVapiAssistant(shop.vapiAssistantId);
  }

  await Shop.findByIdAndDelete(shop._id);

  // Remove store ref from user
  await User.findByIdAndUpdate(ownerId, {
    $unset: { store: 1 },
    role: "user"
  });
};
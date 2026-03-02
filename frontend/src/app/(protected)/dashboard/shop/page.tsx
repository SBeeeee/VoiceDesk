"use client";
import { useState, useEffect } from "react";
import { useShop } from "@/src/hooks/useShop"
import { updateShopThunk, createShopThunk } from "@/src/thunks/shop.thunks";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ShopPage() {
  const { shop, loading, error, updateShop, createShop, clearError } = useShop();

  const [form, setForm] = useState({
    name: "",
    category: "",
    subtitle: "",
    description: "",
    phone: "",
    address: "",
    businessHours: { open: "09:00", close: "18:00", days: [] as string[] },
    services: [] as { name: string; price: number; duration: string; shortDescription: string }[],
  });

  const [saved, setSaved] = useState(false);

  // Populate form with existing shop data
  useEffect(() => {
    if (shop) {
      setForm({
        name: shop.name ?? "",
        category: shop.category ?? "",
        subtitle: shop.subtitle ?? "",
        description: shop.description ?? "",
        phone: shop.phone ?? "",
        address: shop.address ?? "",
        businessHours: {
          open: shop.businessHours?.open ?? "09:00",
          close: shop.businessHours?.close ?? "18:00",
          days: shop.businessHours?.days ?? [],
        },
        services: shop.services ?? [],
      });
    }
  }, [shop]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const toggleDay = (day: string) => {
    setForm((p) => ({
      ...p,
      businessHours: {
        ...p.businessHours,
        days: p.businessHours.days.includes(day)
          ? p.businessHours.days.filter((d) => d !== day)
          : [...p.businessHours.days, day],
      },
    }));
  };

  const addService = () => {
    setForm((p) => ({
      ...p,
      services: [...p.services, { name: "", price: 0, duration: "", shortDescription: "" }],
    }));
  };

  const removeService = (index: number) => {
    setForm((p) => ({
      ...p,
      services: p.services.filter((_, i) => i !== index),
    }));
  };

  const handleServiceChange = (index: number, field: string, value: string | number) => {
    setForm((p) => ({
      ...p,
      services: p.services.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = shop ? updateShop(form) : createShop(form);
    const result = await action;
    if (updateShopThunk.fulfilled.match(result) || createShopThunk.fulfilled.match(result)) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Shop</h1>
        <p className="text-gray-500 text-sm mt-1">
          {shop ? "Update your shop details. Changes sync to your AI voice agent instantly." : "Set up your shop to activate your AI receptionist."}
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {saved && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Saved! AI voice agent updated.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic info card */}
        <div className="bg-white border border-pink-100 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Basic Info</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Shop Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Rose Beauty Studio"
                className="w-full border border-pink-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Salon, Pharmacy"
                className="w-full border border-pink-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tagline</label>
            <input
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              placeholder="e.g. Where beauty meets care"
              className="w-full border border-pink-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Tell customers about your shop..."
              className="w-full border border-pink-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all resize-none"
            />
          </div>
        </div>

        {/* Contact card */}
        <div className="bg-white border border-pink-100 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Contact & Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full border border-pink-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Main St, City"
                className="w-full border border-pink-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Business hours card */}
        <div className="bg-white border border-pink-100 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Business Hours</h2>

          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${form.businessHours.days.includes(day)
                    ? "bg-pink-500 text-white"
                    : "bg-pink-50 text-gray-500 hover:bg-pink-100"
                  }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Opens at</label>
              <input
                type="time"
                value={form.businessHours.open}
                onChange={(e) => setForm((p) => ({ ...p, businessHours: { ...p.businessHours, open: e.target.value } }))}
                className="w-full border border-pink-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Closes at</label>
              <input
                type="time"
                value={form.businessHours.close}
                onChange={(e) => setForm((p) => ({ ...p, businessHours: { ...p.businessHours, close: e.target.value } }))}
                className="w-full border border-pink-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Services card */}
        <div className="bg-white border border-pink-100 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Services</h2>
            <button
              type="button"
              onClick={addService}
              className="text-xs font-medium text-pink-500 hover:text-pink-600 flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Service
            </button>
          </div>

          {form.services.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-pink-50 rounded-xl">
              <p className="text-xs text-gray-400">No services added yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {form.services.map((service, index) => (
                <div key={index} className="relative p-4 border border-pink-50 rounded-xl space-y-3 bg-pink-50/10">
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-medium text-gray-500 uppercase">Service Name</label>
                      <input
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                        placeholder="e.g. Haircut"
                        className="w-full border border-pink-100 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-pink-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-medium text-gray-500 uppercase">Price (₹)</label>
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, "price", parseFloat(e.target.value) || 0)}
                        placeholder="500"
                        className="w-full border border-pink-100 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-pink-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-medium text-gray-500 uppercase">Duration</label>
                      <input
                        value={service.duration}
                        onChange={(e) => handleServiceChange(index, "duration", e.target.value)}
                        placeholder="e.g. 30 mins"
                        className="w-full border border-pink-100 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-pink-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-medium text-gray-500 uppercase">Short Description</label>
                      <input
                        value={service.shortDescription}
                        onChange={(e) => handleServiceChange(index, "shortDescription", e.target.value)}
                        placeholder="Brief overview..."
                        className="w-full border border-pink-100 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-pink-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white font-semibold text-sm rounded-xl py-3 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </>
          ) : shop ? "Save Changes" : "Create Shop"}
        </button>
      </form>
    </div>
  );
}
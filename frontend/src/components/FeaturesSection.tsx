export const FeaturesSection = () => {
  const features = [
    "AI Voice Receptionist",
    "Voice Orders",
    "Lead Capture",
    "Inventory Aware",
    "Call Transcripts",
    "Shop Dashboard",
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="font-[var(--font-display)] text-4xl mb-16">
          Your shop’s smartest employee
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-[#E8E3DE] bg-white"
            >
              <h3 className="font-medium text-lg mb-3">{f}</h3>
              <p className="text-[#6B6560]">
                Built to help local shopkeepers manage customers effortlessly.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
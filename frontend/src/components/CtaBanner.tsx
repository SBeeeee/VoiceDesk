export const CTABanner = () => {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl p-16 text-center text-white bg-gradient-to-br from-[#1A1A1A] to-[#2d2522]">
          <h2 className="font-[var(--font-display)] text-4xl mb-6">
            Every shop deserves a voice.
          </h2>
          <p className="mb-8 text-white/70">
            Set up your AI receptionist in under 5 minutes.
          </p>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-[#e8837a] to-[#c9554c] shadow-lg">
            Create your shop free
          </button>
        </div>
      </div>
    </section>
  );
};
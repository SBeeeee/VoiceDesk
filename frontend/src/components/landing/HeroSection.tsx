import { VoiceOrb } from "@/src/components/landing/Voiceorb";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <p className="text-sm uppercase tracking-widest text-[#E8837A] mb-4">
            AI Voice Receptionist for Local Shops
          </p>

          <h1 className="font-(--font-display) text-5xl leading-tight mb-6">
            Give your shop <br />
            <span className="italic text-[#E8837A]">a voice.</span>
          </h1>

          <p className="text-[#6B6560] mb-8 text-lg leading-relaxed">
            ShopVoice answers calls, captures leads, takes orders, and checks
            inventory automatically — so you never miss a customer.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl text-white bg-linear-to-br from-[#e8837a] to-[#c9554c] shadow-md">
              Create your shop free
            </button>
            <button className="px-6 py-3 rounded-xl border border-[#E8E3DE] text-[#6B6560]">
              See how it works
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <VoiceOrb />
        </div>
      </div>
    </section>
  );
};
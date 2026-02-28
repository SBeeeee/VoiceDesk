export const HowItWorks = () => {
  const steps = [
    {
      title: "Create your shop",
      desc: "Sign up and add your services and inventory.",
    },
    {
      title: "AI is deployed",
      desc: "Your voice receptionist is instantly configured.",
    },
    {
      title: "Customers call",
      desc: "Orders, leads and queries handled automatically.",
    },
  ];

  return (
    <section id="how" className="py-24 bg-[#F5F3F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="font-[var(--font-display)] text-4xl mb-16">
          Up and running in minutes
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-[#E8E3DE]"
            >
              <p className="text-4xl text-[#F2C4C0] mb-4">0{i + 1}</p>
              <h3 className="font-medium text-lg mb-3">{step.title}</h3>
              <p className="text-[#6B6560]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
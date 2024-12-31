export default function Stats() {
  const stats = [
    { value: "30+", label: "Registered users" },
    { value: "250+", label: "Designs generated" }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square md:aspect-auto md:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1616137466211-f939a420be84"
              alt="Interior design showcase"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-12">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight">
            Loved by many Worldwide.
              <span className="text-[#FF5722]"> Number speaks</span>
            </h2>
            
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.value}>
                  <div className="text-4xl sm:text-5xl font-light mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
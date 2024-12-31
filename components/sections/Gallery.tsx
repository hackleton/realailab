import Image from "next/image";

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    "https://images.unsplash.com/photo-1616137466211-f939a420be84",
    "https://images.unsplash.com/photo-1616486965545-c0e19e917288",
    "https://images.unsplash.com/photo-1616486701797-0f33f61038df",
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Decorate every inch of the house
          </h2>
          <p className="text-gray-500 text-lg">
            to make it feel homey
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div key={i} className="relative aspect-square">
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover rounded-lg image-hover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
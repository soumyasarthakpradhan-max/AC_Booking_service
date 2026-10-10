function Hero() {
  return (
    <section className="bg-gradient-to- from-blue-600 to-cyan-500 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Keep Your AC Cool & Healthy ❄️
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Get professional AC cleaning, repair, installation and
          maintenance services at your doorstep.
        </p>

        <button
          onClick={() =>
            document
              .getElementById("booking")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="bg-white text-blue-600 px-8 py-3 rounded-lg
                     font-semibold hover:bg-gray-100 transition"
        >
          Book Service Now
        </button>

      </div>
    </section>
  );
}

export default Hero;
function Services() {
  const services = [
    {
      icon: "🔧",
      iconClass: "service-icon-blue",
      title: "General Service",
      description:
        "Complete AC checkup, filter cleaning, gas pressure check, and performance optimization.",
      price: "₹499",
      priceNote: "per unit",
    },
    {
      icon: "🛠️",
      iconClass: "service-icon-purple",
      title: "AC Repair",
      description:
        "Expert diagnosis and repair for all AC issues — compressor, PCB, fan motor & more.",
      price: "₹799",
      priceNote: "onwards",
    },
    {
      icon: "💨",
      iconClass: "service-icon-cyan",
      title: "Gas Refill",
      description:
        "Refrigerant gas top-up and leak detection to restore optimal cooling performance.",
      price: "₹1,499",
      priceNote: "per unit",
    },
    {
      icon: "📦",
      iconClass: "service-icon-green",
      title: "Installation",
      description:
        "Professional split & window AC installation with proper copper piping and testing.",
      price: "₹1,999",
      priceNote: "per unit",
    },
  ];

  const handleBookClick = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="services-section" id="services">
      <div className="section-header">
        <p className="section-label">Our Services</p>
        <h2 className="section-title">
          Premium AC Care for Every Need
        </h2>
        <p className="section-desc">
          From routine maintenance to emergency repairs, our certified technicians
          deliver excellence with every service.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="service-card"
            onClick={handleBookClick}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`service-icon ${service.iconClass}`}>
              {service.icon}
            </div>
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-desc">{service.description}</p>
            <div className="service-card-price">
              {service.price}
              <span>{service.priceNote}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;

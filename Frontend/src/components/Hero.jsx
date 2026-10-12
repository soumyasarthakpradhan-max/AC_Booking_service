import { useMemo } from "react";

function Hero() {
  // Generate snowflakes
  const snowflakes = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 10}s`,
      fontSize: `${0.5 + Math.random()}rem`,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  // Scroll to booking section
  const handleBookNow = () => {
    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to services section
  const handleViewServices = () => {
    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="hero">
      {/* Background Effects */}
      <div className="hero-bg" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Snowflakes */}
      <div className="snowflakes-container">
        {snowflakes.map((flake) => (
          <span
            key={flake.id}
            className="snowflake"
            style={{
              left: flake.left,
              animationDuration: flake.animationDuration,
              animationDelay: flake.animationDelay,
              fontSize: flake.fontSize,
              opacity: flake.opacity,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Trusted by 10,000+ customers
        </div>

        <h1 className="hero-title">
          Keep Your AC{" "}
          <span className="hero-title-gradient">
            Cool &amp; Healthy
          </span>{" "}
          ❄️
        </h1>

        <p className="hero-subtitle">
          Professional AC cleaning, repair, installation &amp; maintenance
          services — delivered to your doorstep with care and precision.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleBookNow}
          >
            ⚡ Book Service Now
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleViewServices}
          >
            🔍 View Services
          </button>
        </div>

        {/* Statistics */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">10K+</div>
            <div className="hero-stat-label">
              Happy Customers
            </div>
          </div>

          <div className="hero-stat">
            <div className="hero-stat-value">4.9★</div>
            <div className="hero-stat-label">
              Rating
            </div>
          </div>

          <div className="hero-stat">
            <div className="hero-stat-value">24/7</div>
            <div className="hero-stat-label">
              Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
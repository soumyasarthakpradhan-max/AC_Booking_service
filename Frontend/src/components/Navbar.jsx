import { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { label: "Home", target: "hero" },
    { label: "Services", target: "services" },
    { label: "Bookings", target: "bookings" },
  ];

  return (
    <>
    <nav className="bg-blue-600 text-white px-6 py-4">

      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          ❄️ CoolCare
        </h1>

        <div className="flex gap-6">
          <a href="#" className="hover:text-blue-200">
            Home
          </a>

          <a href="#" className="hover:text-blue-200">
            Services
          </a>

          <a href="#" className="hover:text-blue-200">
            Book Service
          </a>
        </div>

          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile ${mobileOpen ? "open" : ""}`}>
        <button
          className="navbar-mobile-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          
        </button>
        {links.map((link) => (
          <a
            key={link.target}
            href={`#${link.target}`}
            className="navbar-link"
            onClick={(e) => handleNavClick(e, link.target)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#booking"
          className="navbar-cta"
          onClick={(e) => handleNavClick(e, "booking")}
        >
          Book Now
        </a>
      </div>
    </>
  );
}

export default Navbar;
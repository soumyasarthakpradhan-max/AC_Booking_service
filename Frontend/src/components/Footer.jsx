function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <div className="footer-brand">
            ❄️ CoolCare
          </div>
          <p className="footer-text" style={{ marginTop: "0.3rem" }}>
            © {year} CoolCare. All rights reserved.
          </p>
        </div>

        <div className="footer-links">
          <a href="#hero" className="footer-link">Home</a>
          <a href="#services" className="footer-link">Services</a>
          <a href="#booking" className="footer-link">Book</a>
          <a href="#bookings" className="footer-link">Bookings</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

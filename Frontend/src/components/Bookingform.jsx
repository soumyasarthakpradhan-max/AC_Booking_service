import { useState, useCallback } from "react";
import axios from "axios";

const AC_TYPES = [
  { value: "Split AC", icon: "🧊", desc: "Wall mounted" },
  { value: "Window AC", icon: "🪟", desc: "Window fitted" },
  { value: "Cassette AC", icon: "🏢", desc: "Ceiling mounted" },
];

const SERVICE_TYPES = [
  {
    value: "General Service",
    icon: "🔧",
    iconClass: "service-icon-blue",
    desc: "Full AC checkup & cleaning",
  },
  {
    value: "AC Repair",
    icon: "🛠️",
    iconClass: "service-icon-purple",
    desc: "Diagnose & fix AC issues",
  },
  {
    value: "Gas Refill",
    icon: "💨",
    iconClass: "service-icon-cyan",
    desc: "Refrigerant gas top-up",
  },
  {
    value: "Installation",
    icon: "📦",
    iconClass: "service-icon-green",
    desc: "New AC setup & mounting",
  },
];

function Bookingform({ onBookingSuccess }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    acType: "",
    service: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const selectAcType = (value) => {
    setFormData({ ...formData, acType: value });
  };

  const selectService = (value) => {
    setFormData({ ...formData, service: value });
  };

  const canProceed = useCallback(() => {
    switch (step) {
      case 1:
        return formData.name.trim() !== "" && formData.phone.trim() !== "";
      case 2:
        return formData.acType !== "" && formData.service !== "";
      case 3:
        return formData.address.trim() !== "";
      default:
        return false;
    }
  }, [step, formData]);

  const nextStep = () => {
    if (canProceed() && step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canProceed()) return;

    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/bookings", formData);

      setShowSuccess(true);
      setFormData({
        name: "",
        phone: "",
        acType: "",
        service: "",
        address: "",
      });
      setStep(1);

      if (onBookingSuccess) onBookingSuccess();

      // Auto-close modal after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Booking Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProgressSteps = () => {
    const steps = ["Details", "Service", "Address"];
    return (
      <div className="booking-progress">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = step === stepNum;
          const isCompleted = step > stepNum;
          return (
            <div className="progress-step" key={label}>
              <div
                className={`progress-step-circle ${
                  isActive ? "active" : ""
                } ${isCompleted ? "completed" : ""}`}
              >
                {isCompleted ? "✓" : stepNum}
                <span className="progress-step-label">{label}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`progress-step-line ${
                    step > stepNum ? "active" : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="form-step" key="step1">
      <h3 className="form-step-title">👋 Personal Details</h3>
      <p className="form-step-desc">Tell us who you are so we can reach you</p>

      <div className="form-group">
        <label className="form-label" htmlFor="booking-name">Full Name</label>
        <input
          id="booking-name"
          type="text"
          name="name"
          placeholder="e.g. Rahul Sharma"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="booking-phone">Phone Number</label>
        <input
          id="booking-phone"
          type="tel"
          name="phone"
          placeholder="e.g. 9876543210"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          autoComplete="tel"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step" key="step2">
      <h3 className="form-step-title">🧊 Select AC & Service</h3>
      <p className="form-step-desc">Choose your AC type and the service you need</p>

      <div className="form-group">
        <label className="form-label">AC Type</label>
        <div className="ac-type-grid">
          {AC_TYPES.map((ac) => (
            <div
              key={ac.value}
              className={`ac-type-option ${
                formData.acType === ac.value ? "selected" : ""
              }`}
              onClick={() => selectAcType(ac.value)}
            >
              <div className="ac-type-icon">{ac.icon}</div>
              <div className="ac-type-name">{ac.value}</div>
              <div className="ac-type-desc">{ac.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group" style={{ marginTop: "1.5rem" }}>
        <label className="form-label">Service Type</label>
        <div className="service-option-grid">
          {SERVICE_TYPES.map((svc) => (
            <div
              key={svc.value}
              className={`service-option ${
                formData.service === svc.value ? "selected" : ""
              }`}
              onClick={() => selectService(svc.value)}
            >
              <div className={`service-option-icon ${svc.iconClass}`}>
                {svc.icon}
              </div>
              <div className="service-option-info">
                <div className="service-option-name">{svc.value}</div>
                <div className="service-option-desc">{svc.desc}</div>
              </div>
              <div className="service-option-check">
                {formData.service === svc.value ? "✓" : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step" key="step3">
      <h3 className="form-step-title">📍 Service Address</h3>
      <p className="form-step-desc">Where should we send the technician?</p>

      <div className="form-group">
        <label className="form-label" htmlFor="booking-address">Your Address</label>
        <textarea
          id="booking-address"
          name="address"
          placeholder="Enter your full address including city, landmark..."
          value={formData.address}
          onChange={handleChange}
          className="form-textarea"
          rows="4"
        />
      </div>

      {/* Summary */}
      <div
        style={{
          background: "var(--bg-glass)",
          border: "1px solid var(--border-glass)",
          borderRadius: "16px",
          padding: "1.2rem",
          marginTop: "1rem",
        }}
      >
        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.8rem" }}>
          Booking Summary
        </p>
        <div style={{ display: "grid", gap: "0.5rem", fontSize: "0.9rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-secondary)" }}>Name</span>
            <span style={{ fontWeight: 600 }}>{formData.name || "—"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-secondary)" }}>Phone</span>
            <span style={{ fontWeight: 600 }}>{formData.phone || "—"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-secondary)" }}>AC Type</span>
            <span style={{ fontWeight: 600 }}>{formData.acType || "—"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-secondary)" }}>Service</span>
            <span style={{ fontWeight: 600 }}>{formData.service || "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section id="booking" className="booking-section">
        <div className="section-header">
          <p className="section-label">Book a Service</p>
          <h2 className="section-title">Schedule Your AC Service</h2>
          <p className="section-desc">
            Fill in the details below and our technician will be at your doorstep
          </p>
        </div>

        <div className="booking-container">
          <div className="booking-card">
            {renderProgressSteps()}

            <form onSubmit={handleSubmit}>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              <div className="form-nav">
                {step > 1 && (
                  <button
                    type="button"
                    className="btn btn-back"
                    onClick={prevStep}
                  >
                    ← Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    className="btn btn-next"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    style={{ opacity: canProceed() ? 1 : 0.4 }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-submit"
                    disabled={!canProceed() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner" /> Booking...
                      </>
                    ) : (
                      "✨ Confirm Booking"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="success-overlay" onClick={() => setShowSuccess(false)}>
          <div
            className="success-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="success-icon">🎉</div>
            <h3 className="success-title">Booking Confirmed!</h3>
            <p className="success-desc">
              Your AC service has been booked successfully. Our technician
              will contact you shortly to confirm the schedule.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowSuccess(false)}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Bookingform;
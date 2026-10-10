import { useEffect, useState } from "react";
import axios from "axios";

function Bookinglist() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Expose refresh function via a callback
  // (called from App when a new booking is added)
  useEffect(() => {
    window.__refreshBookings = fetchBookings;
    return () => {
      delete window.__refreshBookings;
    };
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getServiceEmoji = (service) => {
    switch (service) {
      case "General Service":
        return "🔧";
      case "AC Repair":
        return "🛠️";
      case "Gas Refill":
        return "💨";
      case "Installation":
        return "📦";
      default:
        return "🔧";
    }
  };

  const getAcTypeEmoji = (acType) => {
    switch (acType) {
      case "Split AC":
        return "🧊";
      case "Window AC":
        return "🪟";
      case "Cassette AC":
        return "🏢";
      default:
        return "❄️";
    }
  };

  return (
    <section className="bookings-section" id="bookings">
      <div className="section-header">
        <p className="section-label">Recent Bookings</p>
        <h2 className="section-title">Service Bookings</h2>
        <p className="section-desc">
          Track all your AC service bookings in one place
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <div
            className="spinner"
            style={{
              width: "36px",
              height: "36px",
              margin: "0 auto",
              borderColor: "var(--border-glass)",
              borderTopColor: "var(--color-primary)",
            }}
          />
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3 className="empty-state-title">No Bookings Yet</h3>
          <p className="empty-state-desc">
            Book your first AC service and it will appear here.
          </p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="booking-item"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="booking-item-header">
                <div className="booking-item-avatar">
                  {getInitials(booking.name)}
                </div>
                <div className="booking-item-name">{booking.name}</div>
                <div className="booking-item-badge">Confirmed</div>
              </div>

              <div className="booking-item-divider" />

              <div className="booking-item-details">
                <div className="booking-item-detail">
                  <div className="booking-item-detail-icon">📞</div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Phone
                    </div>
                    <div className="booking-item-detail-value">
                      {booking.phone}
                    </div>
                  </div>
                </div>

                <div className="booking-item-detail">
                  <div className="booking-item-detail-icon">
                    {getAcTypeEmoji(booking.acType)}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      AC Type
                    </div>
                    <div className="booking-item-detail-value">
                      {booking.acType}
                    </div>
                  </div>
                </div>

                <div className="booking-item-detail">
                  <div className="booking-item-detail-icon">
                    {getServiceEmoji(booking.service)}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Service
                    </div>
                    <div className="booking-item-detail-value">
                      {booking.service}
                    </div>
                  </div>
                </div>

                <div className="booking-item-detail">
                  <div className="booking-item-detail-icon">📍</div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Address
                    </div>
                    <div className="booking-item-detail-value">
                      {booking.address}
                    </div>
                  </div>
                </div>
              </div>

              {booking.createdAt && (
                <>
                  <div className="booking-item-divider" />
                  <div className="booking-item-time">
                    🕐 {formatDate(booking.createdAt)}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Bookinglist;
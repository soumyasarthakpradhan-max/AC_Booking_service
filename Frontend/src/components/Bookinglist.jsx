import { useEffect, useState } from "react";
import axios from "axios";

function Bookinglist() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/bookings"
        );

        setBookings(response.data);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-8">
          Service Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">
            No bookings available
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h3 className="text-xl font-bold mb-3">
                  {booking.name}
                </h3>

                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>

                <p>
                  <strong>AC Type:</strong> {booking.acType}
                </p>

                <p>
                  <strong>Service:</strong> {booking.service}
                </p>

                <p>
                  <strong>Address:</strong> {booking.address}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Bookinglist;
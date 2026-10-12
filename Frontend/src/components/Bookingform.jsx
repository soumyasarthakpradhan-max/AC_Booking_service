import { useState } from "react";
import axios from "axios";

function Bookingform() {
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        formData
      );

      console.log("Booking successful:", response.data);

      alert("AC Service Booked Successfully!");

      setFormData({
        name: "",
        phone: "",
        acType: "",
        service: "",
        address: "",
      });
    } catch (error) {
      console.error("Booking Error:", error);

      alert("Booking failed. Please check the backend.");
    }
  };

  return (
    <section id="booking" className="bg-gray-100 py-12">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          Book AC Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="acType"
            value={formData.acType}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select AC Type</option>
            <option value="Split AC">Split AC</option>
            <option value="Window AC">Window AC</option>
            <option value="Cassette AC">Cassette AC</option>
          </select>

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Service</option>
            <option value="General Service">General Service</option>
            <option value="AC Repair">AC Repair</option>
            <option value="Gas Refill">Gas Refill</option>
            <option value="Installation">Installation</option>
          </select>

          <textarea
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Book AC Service
          </button>

        </form>
      </div>
    </section>
  );
}

export default Bookingform;
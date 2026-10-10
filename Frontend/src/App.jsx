import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BookingForm from "./components/Bookingform";
import BookingList from "./components/Bookinglist";
import Footer from "./components/Footer";

function App() {
  const handleBookingSuccess = () => {
    // Refresh the bookings list when a new booking is made
    if (window.__refreshBookings) {
      window.__refreshBookings();
    }
  };

  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <BookingForm onBookingSuccess={handleBookingSuccess} />
      <BookingList />
      <Footer />
    </div>
  );
}

export default App;
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingForm from "./components/Bookingform";
import BookingList from "./components/Bookinglist";

function App() {
  return (
    <div>
      <Navbar />

      <Hero />

      <BookingForm />

      <BookingList />
    </div>
  );
}

export default App;
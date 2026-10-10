function Navbar() {
  return (
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

      </div>

    </nav>
  );
}

export default Navbar;
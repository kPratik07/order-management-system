import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Place Order", path: "/order" },
    { name: "Track Order", path: "/status" },
    { name: "Admin Dashboard", path: "/admin" },
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold tracking-wide">
          🧾 Order Manager
        </h1>
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`hover:text-yellow-400 transition ${
                  location.pathname === item.path ? "text-yellow-400" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Products", path: "/admin/products" },
    { name: "Users", path: "/admin/users" },
  ];

  return (
    <aside className="w-64 bg-gray-100 h-full p-4 border-r border-gray-300 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`block px-3 py-2 rounded hover:bg-gray-200 ${
                location.pathname === link.path ? "bg-gray-300 font-medium" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

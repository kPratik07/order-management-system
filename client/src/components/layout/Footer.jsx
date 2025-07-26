const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 mt-10">
      <div className="max-w-6xl mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} Order Management System. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;

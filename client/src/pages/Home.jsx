import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

const Home = () => {
  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Order Management System
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Seamlessly manage, track, and fulfill customer orders from a
              single dashboard. Start by selecting an action below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/order">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold mb-2">Place Order</h3>
                  <p className="text-blue-100">Create new customer orders</p>
                </div>
              </Link>

              <Link to="/status">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">Track Order</h3>
                  <p className="text-green-100">Check order status</p>
                </div>
              </Link>

              <Link to="/admin">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-4">⚙️</div>
                  <h3 className="text-xl font-semibold mb-2">
                    Admin Dashboard
                  </h3>
                  <p className="text-purple-100">Manage all orders</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;

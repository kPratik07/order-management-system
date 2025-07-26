import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import useOrders from "../hooks/useOrders";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import { exportOrdersCSV } from "../services/orderService";

const AdminDashboard = () => {
  const { orders, loading, error } = useOrders();
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((item) =>
        (item.productName || "").toLowerCase().includes(search.toLowerCase())
      )
  );

  const columns = [
    { header: "Order ID", key: "_id" },
    { header: "Customer", key: "customerName" },
    {
      header: "Items",
      key: "items",
      render: (items) => (
        <div className="max-w-xs">
          {items
            .map(
              (item) =>
                `${item.productName || item.productId} x${item.quantity}`
            )
            .join(", ")}
        </div>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : status === "PAID"
              ? "bg-blue-100 text-blue-800"
              : status === "FULFILLED"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      header: "Payment",
      key: "paymentCollected",
      render: (v) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            v ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {v ? "Paid" : "Pending"}
        </span>
      ),
    },
  ];

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h2>
            <p className="text-gray-600 mt-1">Manage and track all orders</p>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by customer or product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                onClick={exportOrdersCSV}
                variant="success"
                className="whitespace-nowrap"
              >
                📊 Export CSV
              </Button>
            </div>

            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading orders...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {filteredOrders.length} of {orders.length} orders
                  </p>
                </div>
                <Table columns={columns} data={filteredOrders} />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminDashboard;

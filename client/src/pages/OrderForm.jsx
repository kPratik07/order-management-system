import { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import { createOrder } from "../services/orderService";
import useToast from "../hooks/useToast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import PageWrapper from "../components/layout/PageWrapper";
import Select from "../components/ui/Select";
import { getAllProducts } from "../services/productService";

const DEMO_PRODUCTS = [
  { _id: "demo1", name: "Demo Product A", stock: 10 },
  { _id: "demo2", name: "Demo Product B", stock: 5 },
  { _id: "demo3", name: "Demo Product C", stock: 20 },
];

const OrderForm = () => {
  const { values, handleChange, reset } = useForm({
    customerName: "",
    paymentCollected: false,
  });

  const [items, setItems] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast, ToastComponent } = useToast();

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data.length ? data : DEMO_PRODUCTS))
      .catch(() => setProducts(DEMO_PRODUCTS));
  }, []);

  const addItem = () => {
    if (!productId || quantity < 1) return;
    const product = products.find((p) => p._id === productId);
    if (!product) return;
    if (quantity > product.stock) {
      showToast(`Only ${product.stock} in stock for ${product.name}`, "error");
      return;
    }
    setItems([...items, { productId, quantity, productName: product.name }]);
    setProductId("");
    setQuantity(1);
  };

  const removeItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast("Add at least one product to the order.", "error");
      return;
    }
    setLoading(true);
    try {
      await createOrder({
        customerName: values.customerName,
        items: items.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
        paymentCollected: values.paymentCollected,
      });
      showToast("Order created successfully!", "success");
      reset();
      setItems([]);
    } catch (err) {
      showToast("Failed to create order", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex justify-center px-4 py-10">
        <div className="bg-white border border-blue-200 shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
            Create a New Order
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col items-center">
              <Input
                name="customerName"
                value={values.customerName}
                onChange={handleChange}
                placeholder="Customer Name"
                className="mb-2 w-72"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                <Select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  options={[
                    { value: "", label: "Select Product" },
                    ...products.map((p) => ({
                      value: p._id,
                      label: `${p.name} (Stock: ${p.stock})`,
                    })),
                  ]}
                  className="w-48"
                />
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Quantity"
                  className="w-20"
                />
                <Button
                  type="button"
                  onClick={addItem}
                  variant="primary"
                  size="sm"
                >
                  Add
                </Button>
              </div>

              {items.length > 0 && (
                <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  {items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between gap-6 mb-2 last:mb-0"
                    >
                      <span className="text-gray-800">
                        <span className="font-semibold">
                          {values.customerName || "Customer"}:
                        </span>{" "}
                        {item.productName} x {item.quantity}
                      </span>
                      <Button
                        type="button"
                        onClick={() => removeItem(idx)}
                        size="sm"
                        variant="danger"
                        className="ml-4"
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </div>
              )}
            </div>

            {/* Vertical gap between checkbox and button */}
            <div className="flex flex-col items-center gap-y-6 mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="paymentCollected"
                  checked={values.paymentCollected}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "paymentCollected",
                        value: e.target.checked,
                      },
                    })
                  }
                  className="mr-2"
                />
                <span>Payment Collected</span>
              </div>

              <Button
                type="submit"
                disabled={loading}
                size="md"
                variant="primary"
              >
                {loading ? "Placing..." : "Place Order"}
              </Button>
            </div>
          </form>
          {ToastComponent}
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderForm;

import { createOrder } from "../api/order";

const Order = () => {
  const handleOrder = async () => {
    const data = await createOrder("PUT_ANY_MEDICINE_ID_HERE");
    alert("Order placed successfully");
    console.log(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Place Order</h2>
      <button onClick={handleOrder}>Order Medicine</button>
    </div>
  );
};

export default Order;
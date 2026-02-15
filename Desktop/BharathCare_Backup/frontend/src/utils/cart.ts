export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const addToCart = (medicine: any) => {
  const cart = getCart();

  const existing = cart.find((item: any) => item._id === medicine._id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...medicine, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateQty = (id: string, change: number) => {
  const cart = getCart()
    .map((item: any) =>
      item._id === id
        ? { ...item, qty: item.qty + change }
        : item
    )
    .filter((item: any) => item.qty > 0);

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import setProductQuantity from "./actions";
import CartEntry from "./CartEntry";
import TotalWithShipping from "./TotalWithShipping";

export const metadata = {
  title: "Your Cart - GarageShop",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
      <div className="flex">
        <div className="w-1/2">
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            {cart?.items.map((cartItem: any) => (
                <CartEntry
                cartItem={cartItem}
                key={cartItem.id}
                setProductQuantity={setProductQuantity}
                />
            ))}
        </div>
          {!cart?.items.length ? <div></div> : <div className="w-1/2">
            <div className="flex flex-col fixed gap-4 border border-solid border-slate-900 shadow-md w-80 px-2 md:px-0 py-10 mx-10 bg-slate-100 rounded-lg sm:items-center">
                <p className="mb-3 font-bold">
                Subtotal: {formatPrice(cart?.subtotal || 0)}
                </p>
                <TotalWithShipping cart={cart!} /> 
                {!cart?.items.length ? (
                <div></div>
                ) : (
                <button className="btn-primary btn w-[35%] sm:w-[200px]">Checkout</button>
                )}
            </div>
          </div>}
          {!cart?.items.length && <p><br /> Your cart is empty</p>}
    </div>
  );
}
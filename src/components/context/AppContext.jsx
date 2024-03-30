"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
 let price = cartProduct.basePrice
 if (cartProduct.size) {
  price += cartProduct.size.price
 }
 if (cartProduct.extra?.length > 0) {
  for (const extra of cartProduct.extra) {
   price += extra.price
  }
 }
 return price
}

export const AppProviderSession = ({ children, session }) => {

 const [cartProducts, setCartProducts] = useState([])

 const ls = typeof window !== "undefined" ? window.localStorage : null

 useEffect(() => {
  if (ls && ls.getItem("cart")) {
   setCartProducts(JSON.parse(ls.getItem("cart")))
  }
 }, [])





 const saveCartProductsToLocalStorage = (cartProducts) => {
  if (ls) {
   ls.setItem("cart", JSON.stringify(cartProducts))
  }
 }


 function addToCart(product, size = null, extra = []) {
  setCartProducts(prevProducts => {
   const cartProducts = { ...product, size, extra }
   const newProducts = [...prevProducts, cartProducts]
   saveCartProductsToLocalStorage(newProducts)
   return newProducts
  })
 }
 return (
  <SessionProvider session={session}>
   <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart }}>
    {children}
   </CartContext.Provider>
  </SessionProvider>)
};

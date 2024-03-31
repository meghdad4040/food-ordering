"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({})

export const cartProductPrice = (cartProduct) => {
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

 const clearCart = () => {
  setCartProducts([])
  saveCartProductsToLocalStorage([])
 }

 const removeCartProduct = (indexToRemove) => {
  setCartProducts(prevCartProducts => {
   const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove)
   saveCartProductsToLocalStorage(newCartProducts)
   return newCartProducts
  })
  toast.success("Product removed successfully")
 }

 const addToCart = (product, size = null, extra = []) => {
  setCartProducts(prevProducts => {
   const cartProducts = { ...product, size, extra }
   const newProducts = [...prevProducts, cartProducts]
   saveCartProductsToLocalStorage(newProducts)
   return newProducts
  })
 }

 return (
  <SessionProvider session={session}>
   <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart }}>
    {children}
   </CartContext.Provider>
  </SessionProvider>)
};

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = create(
    persist(
        (set, get) => ({
            // initail state: empty array for storing favorite items
            favorites: [], 

            // action to add an item to the favorites list
            addToFavs: (item) => set((state) => ({
                // spread the current state of favorites and add new item
                favorites: [...state.favorites, item]
            })),

            // action to remove an item from array using id
            removeFromFavs: (id) => set((state) => ({
                // filter the lsit to remove item w matching id
                favorites: state.favorites.filter(item => item.idMeal !== id)
            })),

            // initail state: empty array for storing favorite items
            cart: [],

            // action to add an item to cart
            addToCart: (item) => set((state) => {
                const existingItem = state.cart.find(cartItem => cartItem.idMeal === item.idMeal);
                if (existingItem) {
                    // If the item is already in the cart, increase its quantity
                    return {
                        cart: state.cart.map(cartItem => 
                            cartItem.idMeal === item.idMeal 
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                        )
                    };
                } else {
                    // If the item is not in the cart, add it with quantity 1
                    return {
                        cart: [...state.cart, { ...item, quantity: 1 }]
                    };
                }
            }),

            // action to remove an item cart using id
            removeFromCart: (id) => set((state) => {
                const updatedCart = state.cart.filter(item => item.idMeal !== id);
                return {
                    cart: updatedCart.length > 0 ? updatedCart : []
                };
            }),

            // action to update the quantity of an item in the cart
            updateCartQuantity: (id, quantity) => set((state) => ({
                cart: state.cart.map(cartItem =>
                    cartItem.idMeal === id
                        ? { ...cartItem, quantity: Math.max(cartItem.quantity + quantity, 0) } // Ensure quantity doesn't go below 0
                        : cartItem
                )
            })),

            // selector to check if an item is in favorites list using id
            isFav: (id) => {
                const state = get();
                return state.favorites.some(item => item.idMeal === id)
            }
        }),
        {
            name: 'favorites', // unique name for storage
            storage: createJSONStorage(() => AsyncStorage) // specify AsyncStorage as the storage
        }
    )
);

export default store;


// ADDITIONAL NOTES

// zustand (german for 'state')
    // what --> library used to manage state
    // why --> simple and intuitive (esp when compared to Redux)
    // how --> creates a global state that can be shared across different components
// create = function to create a new store
// set = receives current state and returns new state

// AsyncStorage = tool to remember data even if app is closed or refreshed
    // persist = middleware to make sure data saved and fetched back correctly
    // createJSONStorage = ensures data is in JSON format
// Initial state for the cart
const initialState = {
  cartItems: []
};

// Reducer function for managing the cart state
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case for adding a new item to the cart
    case 'ADD_TO_CART':
      // Extract the new item from the action payload
      const newItem = action.payload;

      // Check if the item is already in the cart
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      // If the item is already in the cart, update its quantity
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...newItem, quantity: 1 }]
        };
      }

    // Case for updating the quantity of items in the cart
    case 'UPDATE_CART':
      // Extract the product and action from the payload
      const { product, action: cartAction } = action.payload;

      // Check the action type and update the cart accordingly
      if (cartAction === 'increase') {
        // Increase the quantity of a specific item in the cart
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else if (cartAction === 'decrease') {
        // Decrease the quantity of a specific item in the cart
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === product.id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        };
      } else if (cartAction === 'remove') {
        // Remove a specific item from the cart
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== product.id)
        };
      } else {
        // If the action is not recognized, return the current state
        return state;
      }

    // Default case for handling unknown actions
    default:
      return state;
  }
};

export default cartReducer;

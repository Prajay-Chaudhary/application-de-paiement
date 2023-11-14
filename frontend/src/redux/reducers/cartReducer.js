const initialState = {
  cartItems: []
};

// Reducer function for managing the cart state
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case for adding a new item to the cart
    case 'ADD_TO_CART':
      const newItem = action.payload;
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

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: []
      };

    // Case for updating the quantity of items in the cart
    case 'UPDATE_CART':
      const { product, action: cartAction } = action.payload;

      // Check the action type and update the cart accordingly
      if (cartAction === 'increase') {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else if (cartAction === 'decrease') {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === product.id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        };
      } else if (cartAction === 'remove') {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== product.id)
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default cartReducer;

import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

const firebase = "https://redux-f63a6-default-rtdb.firebaseio.com/cart.json";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(firebase);
      if (!response.ok) {
        throw new Error("Fetching data from the database failed!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData?.items || [],
          totalQuantity: cartData?.totalQuantity || 0,
        }),
      );

      return cartData;
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        }),
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending",
        message: "Fetching cart data!",
      }),
    );

    const sendResponse = async () => {
      const response = await fetch(firebase, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });
      if (!response.ok) {
        throw new Error("Sending data to the database failed!");
      }
    };
    try {
      await sendResponse();

      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "rejected",
          title: "Error!",
          message: error.message,
        }),
      );
    }
  };
};

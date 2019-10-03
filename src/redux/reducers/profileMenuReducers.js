import * as C from "../actions/actionTypes";
import { menuItems } from "../data/profileMenu";

const initialState = menuItems;

export const profileMenuItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.SET_ACTIVE:
      return state.map(link =>
        link.id === action.id
          ? { ...link, active: true }
          : { ...link, active: false }
      );
    case C.SET_PROFILE_ACTIVE:
      return (state = initialState);
    default:
      return state;
  }
};

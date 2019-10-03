import * as C from "../actions/actionTypes";
import { mainMenu } from "../data/mainMenu";

const initialState = mainMenu;

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.SELECT_MENU_ITEM:
      return state.map(link =>
        link.id === action.id
          ? { ...link, active: true }
          : { ...link, active: false }
      );
    case C.SELECT_CABINET:
      return state.map(link => Object.assign(link, { active: false }));
    default:
      return state;
  }
};

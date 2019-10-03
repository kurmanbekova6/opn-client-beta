import * as C from "../actions/actionTypes";
import { workspaceMenus } from "../data/workspaceMenus";

const initialState = workspaceMenus;

export const workspaceMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.SET_WORKSPACE_MENU_ITEM_ACTIVE:
      return state.map(link =>
        link.id === action.id
          ? { ...link, active: true }
          : { ...link, active: false }
      );
    default:
      return state;
  }
};

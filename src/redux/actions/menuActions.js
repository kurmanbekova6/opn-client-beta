import * as C from "./actionTypes";

export const selectMenuItem = id => ({
  type: C.SELECT_MENU_ITEM,
  id,
});

export const selectCabinet = () => ({
  type: C.SELECT_CABINET,
});

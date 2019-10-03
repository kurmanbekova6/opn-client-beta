import * as C from "./actionTypes";

export const workspaceMenuItemSetActive = id => ({
  type: C.SET_WORKSPACE_MENU_ITEM_ACTIVE,
  id,
});

export const workspaceMenuSubItemSetActive = (parent, child) => ({
  type: C.SET_WORKSPACE_SUB_MENU_ITEM_ACTIVE,
  parent,
  child,
});

import * as C from "./actionTypes";

export const setActiveProfileMenuItem = id => ({
  type: C.SET_ACTIVE,
  id,
});

export const setProfileActive = () => ({
  type: C.SET_PROFILE_ACTIVE,
});

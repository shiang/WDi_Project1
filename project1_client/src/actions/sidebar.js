export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export function toggleSideBar(isOpened) {
  return {
    type: TOGGLE_SIDEBAR,
    isOpened
  };
}

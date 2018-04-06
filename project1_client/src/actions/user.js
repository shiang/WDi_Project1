export const SAVE_TOKEN = "SAVE_TOKEN";
export const SAVE_USER = "SAVE_USER";

export function saveUser(user) {
  return {
    type: SAVE_USER,
    user
  };
}

export function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

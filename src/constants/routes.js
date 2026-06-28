export const ROUTES = {
  HOME: "/dasboard/feed",
  TEST: "/test",

  LOGIN: "/auth/login",
  REGISTER: "/auth/register",

  PROFILE: "/profile",

  POST_DETAIL: (id) => `/dasboard/feed/${id}`,

  COLLAB_DETAIL: (id) => `/dasboard/collaborations/${id}`,


}
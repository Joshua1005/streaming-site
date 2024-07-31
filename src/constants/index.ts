/**
 * Routes for authenticating users.
 */
const AUTH_ROUTES: ReadonlyArray<string> = ["/signin", "/signup"];

/**
 * These are the routes that are public, it means that whether the user is authenticated or not won't redirected into AUTH_ROUTES.
 */
const PUBLIC_ROUTES: ReadonlyArray<string> = ["/"];

/**
 * Code for keyboard accessibility.
 */
const VIDEO_KEY_CODES: ReadonlyArray<string> = [
  "Space",
  "KeyK",
  "KeyJ",
  "KeyL",
  "KeyF",
  "KeyM",
  "KeyI",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
];

export { AUTH_ROUTES, PUBLIC_ROUTES, VIDEO_KEY_CODES };

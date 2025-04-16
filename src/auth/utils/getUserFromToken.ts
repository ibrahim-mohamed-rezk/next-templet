export function getUserFromToken(token: string) {
  // Example only - in real apps use JWT decode or fetch user
  return token ? { email: "user@example.com" } : null;
}
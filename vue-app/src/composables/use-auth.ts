export function useAuth() {
  const authProviders = ['twitter', 'github', 'aad', 'google', 'facebook'];

  return {
    authProviders,
  };
}

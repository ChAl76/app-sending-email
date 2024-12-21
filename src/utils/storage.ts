export const storage = {
  setCredentials(username: string, password: string) {
    localStorage.setItem('credentials', JSON.stringify({ username, password }));
  },

  getCredentials(): { username: string; password: string } | null {
    const credentials = localStorage.getItem('credentials');
    return credentials ? JSON.parse(credentials) : null;
  },

  clearCredentials() {
    localStorage.removeItem('credentials');
  },
};

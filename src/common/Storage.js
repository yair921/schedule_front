const Storage = {
    isAuthenticated: false,
    tokenSession: null,
    setAuthentication(token) {
        this.tokenSession = token;
        this.isAuthenticated = true;
    }
}
export default Storage;
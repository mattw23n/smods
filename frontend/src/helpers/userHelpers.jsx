export const logoutUser = (setUser, navigate) => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user state
    navigate('/');
};
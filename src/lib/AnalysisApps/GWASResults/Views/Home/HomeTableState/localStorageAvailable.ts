const localStorageAvailable = () => {
  try {
    localStorage.setItem('1', '1');
    localStorage.removeItem('1');
    return true;
  } catch {
    return false;
  }
};

export default localStorageAvailable;

export const truncate = (str, length) => {
  if (!str) return;

  return str.length > length ? str.substr(0, length) + '...' : str;
};

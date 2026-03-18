const truncate = (text, maxLength = 10) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

export default truncate;
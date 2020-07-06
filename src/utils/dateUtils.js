// DD MMM YYYY
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();

  if (isNaN(year)) {
    return "Not available";
  }

  return `${year}`;
};

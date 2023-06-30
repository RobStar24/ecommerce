export const formatDDMMYYYY = (oldFormat) => {
  const newDate = new Date(oldFormat);
  const option = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return newDate.toLocaleDateString("es-ES", option);
};

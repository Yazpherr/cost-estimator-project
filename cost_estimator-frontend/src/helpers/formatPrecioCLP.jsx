export const formatPrecioCLP = (precio) => {
  // Suponiendo que `precio` es un número
  const precioFormateado = precio.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });
  return `${precioFormateado}`;
};
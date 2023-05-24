import { Ciudad } from '../../interfaces/ciudad';
import { listarCiudades } from '../../peticiones/crud-ciudades';

let ciudades: Ciudad;
export const mostrarCiudades = async (id: string) => {
  ciudades = await listarCiudades();
  Object.values(ciudades).forEach(({ nombre, codigopostal }) => {
    const ciudades = document.querySelector(id);
    const options = document.createElement('option');
    options.value = `${codigopostal} - ${nombre}`;
    options.textContent = nombre;
    ciudades?.appendChild(options);
  });
};

import { Ciudad } from '../../interfaces/ciudad';
import { buscarCiudad, listarCiudades } from '../../peticiones/crud-ciudades';

let ciudades: Ciudad;
export const mostrarCiudades = async (
  id: string,
  seleccionado: boolean = false,
  ciudadABuscar?: string
) => {
  ciudades = await listarCiudades();
  Object.values(ciudades).forEach(async ({ nombre, codigopostal }) => {
    const ciudades = document.querySelector<HTMLSelectElement>(id);
    const options = document.createElement('option');
    const result = await buscarCiudad(ciudadABuscar!);
    if (seleccionado) {
      ciudades!.selectedIndex = result;
      ciudades!.ariaRowIndex = `${result}`;
    }
    options.value = `${codigopostal} - ${nombre}`;
    options.textContent = nombre;
    ciudades?.appendChild(options);
  });
};

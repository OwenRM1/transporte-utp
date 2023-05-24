import { Conductor, conductorDefault } from '../interfaces/conductor';
import { axiosI } from './axios';

export const listarConductores = async (): Promise<Conductor[]> => {
  try {
    const response = await axiosI.get('/registrarconductores/conductores.json');
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error al obtener los conductores:', error);
    throw error;
  }
};

export const obtenerConductoryPrecio = async (
  rutaOrigen: string,
  rutaDestino: string
): Promise<[number, Conductor]> => {
  let conductor: Conductor = conductorDefault;
  let precio: number = 0;
  try {
    const response = await axiosI.get('/registrarconductor/conductores.json');
    const data = response.data;
    const conductores: Conductor[] = Object.values(data);

    const conductorFiltrado = conductores.filter(
      ({ ruta }) => ruta.includes(rutaOrigen) && ruta.includes(rutaDestino)
    );

    const rutaIda = conductorFiltrado[0].ruta.split('-')[0].trim();
    const rutaVuelta = conductorFiltrado[0].ruta.split('-')[1].trim();

    if (
      (rutaIda === rutaOrigen && rutaVuelta === rutaDestino) ||
      (rutaIda === rutaDestino && rutaVuelta === rutaOrigen)
    ) {
      conductor = conductorFiltrado[0];
      if (
        (rutaIda === 'Huancayo' && rutaVuelta === 'Lima') ||
        (rutaIda === 'Lima' && rutaVuelta === 'Huancayo')
      ) {
        precio = 80;
      }
      if (
        (rutaIda === 'Huancayo' && rutaVuelta === 'Huanuco') ||
        (rutaIda === 'Huanuco' && rutaVuelta === 'Huancayo')
      ) {
        precio = 60;
      }
      if (
        (rutaIda === 'Huancayo' && rutaVuelta === 'Pucallpa') ||
        (rutaIda === 'Pucallpa' && rutaVuelta === 'Huancayo')
      ) {
        precio = 100;
      }
      if (
        (rutaIda === 'Huanuco' && rutaVuelta === 'Lima') ||
        (rutaIda === 'Lima' && rutaVuelta === 'Huanuco')
      ) {
        precio = 100;
      }
      if (
        (rutaIda === 'Huanuco' && rutaVuelta === 'Pucallpa') ||
        (rutaIda === 'Pucallpa' && rutaVuelta === 'Huanuco')
      ) {
        precio = 50;
      }
      if (
        (rutaIda === 'Lima' && rutaVuelta === 'Pucallpa') ||
        (rutaIda === 'Pucallpa' && rutaVuelta === 'Lima')
      ) {
        precio = 150;
      }
    }
    return [precio, conductor];
  } catch (error) {
    throw new Error('Ruta no disponible');
  }
};

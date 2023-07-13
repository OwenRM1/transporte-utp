import { Ruta, RutaI } from '../interfaces/rutas';
import { axiosI } from './axios';

export const listarAsientos = async () => {
  try {
    const response = await axiosI.get<Ruta[]>('/rutas.json');

    const ruta = Object.values(response.data).map((ruta) =>
      Object.values(ruta.asientos).map((asiento): RutaI => {
        return {
          origen: ruta.de,
          destino: ruta.a,
          asiento: asiento.numero,
          ocupado: asiento.ocupado,
        };
      })
    );

    return ruta;
  } catch (error) {
    console.error('Error al obtener los asientos:', error);
    throw error;
  }
};

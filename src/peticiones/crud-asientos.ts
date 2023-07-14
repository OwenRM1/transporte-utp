import { Asiento, Ruta, RutaI } from '../interfaces/rutas';
import { axiosI } from './axios';

export const listarAsientos = async () => {
  try {
    const response = await axiosI.get<Ruta[]>('/rutas.json');

    const ruta = Object.values(response.data).map((ruta) =>
      Object.values(ruta.asientos).map((asiento): RutaI => {
        return {
          origen: ruta.de,
          destino: ruta.a,
          salida: ruta.salida,
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

export const buscarRuta = async (miAsiento: number, origen: string, destino: string) => {
  const asientos = await axiosI.get<Ruta[]>('/rutas.json');

  const ruta = Object.values(asientos.data).map((ruta) =>
    Object.values(ruta.asientos).map((asiento): RutaI => {
      return {
        origen: ruta.de,
        destino: ruta.a,
        salida: ruta.salida,
        asiento: asiento.numero,
        ocupado: asiento.ocupado,
      };
    })
  );

  let rutaActualizada: RutaI = {} as RutaI;
  for (let i = 0; i < ruta.length; i++) {
    for (let j = 0; j < ruta[i].length; j++) {
      let ruta2 = ruta[i][j];
      if (
        ruta2.asiento === miAsiento &&
        ruta2.origen === origen &&
        ruta2.destino === destino
      ) {
        rutaActualizada = {
          ...ruta2,
          ocupado: true,
        };
        break;
      }
    }
  }
  return rutaActualizada;
};

export const actualizarAsiento = async (
  asiento: Asiento,
  origen: string,
  destino: string
) => {
  let ruta: string = '';
  if (origen === 'Huancayo' && destino === 'Huanuco') {
    ruta = 'ruta1';
  }
  if (origen === 'Huancayo' && destino === 'Lima') {
    ruta = 'ruta2';
  }
  if (origen === 'Huancayo' && destino === 'Pucallpa') {
    ruta = 'ruta3';
  }
  if (origen === 'Huanuco' && destino === 'Huancayo') {
    ruta = 'ruta4';
  }
  if (origen === 'Huanuco' && destino === 'Lima') {
    ruta = 'ruta5';
  }
  if (origen === 'Huanuco' && destino === 'Pucallpa') {
    ruta = 'ruta6';
  }
  if (origen === 'Lima' && destino === 'Huancayo') {
    ruta = 'ruta7';
  }
  if (origen === 'Lima' && destino === 'Huanuco') {
    ruta = 'ruta8';
  }
  if (origen === 'Lima' && destino === 'Pucallpa') {
    ruta = 'ruta9';
  }
  if (origen === 'Pucallpa' && destino === 'Huanuco') {
    ruta = 'ruta10';
  }
  if (origen === 'Pucallpa' && destino === 'Huancayo') {
    ruta = 'ruta11';
  }
  if (origen === 'Pucallpa' && destino === 'Lima') {
    ruta = 'ruta12';
  }

  try {
    await axiosI.put(`/rutas/${ruta}/asientos/asiento${asiento.numero}.json`, {
      ...asiento,
    });
  } catch (error) {
    console.error('Error al actualizar el asiento:', error);
    throw error;
  }
};

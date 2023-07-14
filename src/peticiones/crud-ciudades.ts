import { Database, ref, set } from 'firebase/database';
import { Ciudad } from '../interfaces/ciudad';
import { axiosI } from './axios';
import { AxiosResponse } from 'axios';

export const listarCiudades = async (): Promise<Ciudad> => {
  try {
    const response: AxiosResponse = await axiosI.get('/registrarciudades/ciudades.json');
    const data: Ciudad = response.data;
    return data;
  } catch (error) {
    console.error('Error al obtener las ciudades:', error);
    throw error;
  }
};

export const agregarCiudad = async (
  database: Database,
  ciudadId: string,
  ciudad: Ciudad
) => {
  try {
    await set(ref(database, `registrarciudades/ciudades/${ciudadId}`), ciudad);
  } catch (error) {
    throw new Error('Error al registrar la ciudad:');
  }
};

export const buscarCiudad = async (nombreCiudad: string): Promise<number> => {
  try {
    const response: AxiosResponse = await axiosI.get('/registrarciudades/ciudades.json');
    const data: Ciudad = response.data;
    const ciudades: Ciudad[] = Object.values(data);
    const indiceDeCiudadABuscar = ciudades.findIndex(
      (ciudad) => ciudad.nombre === nombreCiudad
    );
    return indiceDeCiudadABuscar;
  } catch (error) {
    console.error('Error al obtener las ciudades:', error);
    throw error;
  }
};

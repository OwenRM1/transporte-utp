import { Venta } from '../interfaces/ventas';
import { axiosI } from './axios';
import { AxiosResponse } from 'axios';

export const generarVenta = async (venta: Venta) => {
  try {
    await axiosI.post('/registrarventas/ventas.json', venta);
    console.log('Venta registrada exitosamente');
  } catch (error) {
    console.error('Error al registrar la venta:', error);
  }
};

export const listarVentas = async (): Promise<Venta[]> => {
  try {
    const response: AxiosResponse = await axiosI.get('/registrarventas/ventas.json');
    const data: Venta[] = Object.values(response.data);
    return data;
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    throw error;
  }
};

export const eliminarVenta = async (id: string) => {
  try {
    await axiosI.delete(`/registrarventas/ventas/${id}.json`);
    console.log('Venta eliminada exitosamente');
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
  }
};

export const editarVenta = async (id: string, venta: Venta) => {
  try {
    await axiosI.put(`/registrarventas/ventas/${id}.json`, venta);
    console.log('Venta editada exitosamente');
  } catch (error) {
    console.error('Error al editar la venta:', error);
  }
};

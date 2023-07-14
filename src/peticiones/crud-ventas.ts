import { Venta } from '../interfaces/ventas';
import { axiosI } from './axios';
import { AxiosResponse } from 'axios';
import { database } from '../services/firebase.config';
import { get, push, ref } from 'firebase/database';

export const generarVenta = async (venta: Venta) => {
  try {
    const ventasRef = ref(database, 'registrarventas/ventas');
    const nuevaVentaRef = push(ventasRef, venta);
    console.log(`Se ha añadido una nueva venta con el ID: ${nuevaVentaRef.key}`);
    localStorage.setItem('ventaId', nuevaVentaRef.key!);
    return nuevaVentaRef.key;
    // await axiosI.post('/registrarventas/ventas.json', venta);
    // console.log('Venta registrada exitosamente');
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
  const ventasRef = ref(database, 'registrarventas/ventas');
  let key;
  try {
    const snapshot = await get(ventasRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const venta = childSnapshot;
        if (id === venta.val().id) {
          console.log(venta.key);
          key = venta.key;
        }
      });
    }
    await axiosI.delete(`/registrarventas/ventas/${key}.json`);
  } catch (error) {
    console.error(`Error al buscar ventas: ${error}`);
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

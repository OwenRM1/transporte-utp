import { AxiosResponse } from 'axios';
import { Cliente } from '../interfaces/cliente';
import { axiosI } from './axios';
import { Database, ref, set } from 'firebase/database';

export const listarClientes = async (): Promise<Cliente> => {
  try {
    const response: AxiosResponse = await axiosI.get('/registrarclientes/clientes.json');
    const data: Cliente = response.data;
    return data;
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    throw error;
  }
};

export const buscarClientes = async (nombreBuscar: string): Promise<Cliente> => {
  try {
    const response: AxiosResponse = await axiosI.get('/registrarclientes/clientes.json');
    const data: Cliente = response.data;
    const clientes: Cliente[] = Object.values(data);
    const clienteFiltrado = clientes.filter(({ nombre }) =>
      nombre.includes(nombreBuscar)
    );
    return clienteFiltrado[0];
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    throw error;
  }
};

export const crearCliente = async (
  database: Database,
  idCliente: string,
  cliente: Cliente
) => {
  try {
    await set(ref(database, `registrarclientes/clientes/${idCliente}`), cliente);
    console.log('Cliente registrado exitosamente');
  } catch (error) {
    console.error('Error al registrar el cliente:', error);
  }
};

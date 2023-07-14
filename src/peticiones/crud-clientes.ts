import { AxiosResponse } from 'axios';
import { Cliente } from '../interfaces/cliente';
import { axiosI } from './axios';
import { Database, ref, set } from 'firebase/database';
import { sweetMensaje } from '../Utilidades/sweetMenaje';

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
  } catch (error) {
    throw new Error('Error al registrar el cliente');
  }
};

export const eliminarCliente = async (idCliente: string) => {
  try {
    await axiosI.delete(`/registrarclientes/clientes/${idCliente}.json`);
  } catch (error) {
    throw new Error('Error al eliminar el cliente:');
  }
};

export const editarCliente = async (idCliente: string, cliente: Cliente) => {
  try {
    await axiosI.put(`/registrarclientes/clientes/${idCliente}.json`, cliente);
    sweetMensaje('Cliente editado exitosamente', 'success');
  } catch (error) {
    throw new Error('Error al editar el cliente:');
  }
};

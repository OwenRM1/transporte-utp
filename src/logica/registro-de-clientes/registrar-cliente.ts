import { Cliente } from '../../interfaces/cliente';
import { crearCliente } from '../../peticiones/crud-clientes';
import { database } from '../../services/firebase.confing';

export const registrarCliente = async (e: Event) => {
  e.preventDefault();
  const apellido = document.querySelector<HTMLInputElement>('#re-apellido')!.value;
  const nombre = document.querySelector<HTMLInputElement>('#re-nombre')!.value;
  const dni = document.querySelector<HTMLInputElement>('#re-dni')!.value;
  const correo = document.querySelector<HTMLInputElement>('#re-email')!.value;
  const telefono = document.querySelector<HTMLInputElement>('#re-telefono')!.value;

  const cliente: Cliente = {
    apellido: apellido.toLowerCase(),
    nombre: nombre.toLowerCase(),
    dni,
    correo: correo.toLowerCase(),
    telefono,
  };
  await crearCliente(database, cliente.dni, cliente);
};

import { buscarClientes } from '../../peticiones/crud-clientes';
// import './registro-de-ventas.css'

export const realizarBusqueda = (e: Event) => {
  e.preventDefault();
  const nombre = document.querySelector<HTMLInputElement>('#nombre');
  mostrarClienteBuscado(nombre!.value);
};

const mostrarClienteBuscado = async (nombre: string) => {
  const clienteBuscado = await buscarClientes(nombre);
  const apellido = document.querySelector<HTMLInputElement>('#apellido');
  const nombrec = document.querySelector<HTMLInputElement>('#nombre');
  const dni = document.querySelector<HTMLInputElement>('#dni');
  const telefono = document.querySelector<HTMLInputElement>('#telefono');

  apellido!.value = clienteBuscado.apellido;
  nombrec!.value = clienteBuscado.nombre;
  dni!.value = clienteBuscado.dni;
  telefono!.value = clienteBuscado.telefono!;
};

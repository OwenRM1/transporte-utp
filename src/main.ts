import { registrarCliente } from './logica/registro-de-clientes/registrar-cliente';
import { realizarBusqueda } from './logica/registro-de-ventas/buscar-cliente';
import { mostrarCiudades } from './logica/registro-de-ventas/mostrar-ciudades';
import { calcularPrecioaRegistrar } from './logica/registro-de-ventas/registrar-venta';

const btnBuscar = document.getElementById('btnBuscar');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnCalcularPrecio = document.getElementById('btnCalcularPrecio');
const btnRegistrarCliente = document.getElementById('registrar-cliente');

document.addEventListener('DOMContentLoaded', () => {
  mostrarCiudades('#origen');
  mostrarCiudades('#destino');
});

btnBuscar?.addEventListener('click', realizarBusqueda);
btnRegistrarCliente?.addEventListener('submit', registrarCliente);
btnRegistrar?.addEventListener('click', () => {
  window.location.href = 'registro-clientes.html';
});

btnCalcularPrecio?.addEventListener('click', calcularPrecioaRegistrar);
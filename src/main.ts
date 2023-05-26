import { registrarCliente } from './logica/registro-de-clientes/registrar-cliente';
import { registrarConductor } from './logica/registro-de-conductores/registrar-conductor';
import { realizarBusqueda } from './logica/registro-de-ventas/buscar-cliente';
import { mostrarCiudades } from './logica/registro-de-ventas/mostrar-ciudades';
import { mostrarVentas } from './logica/registro-de-ventas/mostrar-ventas';
import { calcularPrecioaRegistrar } from './logica/registro-de-ventas/registrar-venta';

const btnBuscar = document.getElementById('btnBuscar');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnCalcularPrecio = document.getElementById('registrar-venta');
const btnRegistrarCliente = document.getElementById('registrar-cliente');
const btnRegistrarConductor = document.getElementById('registrar-chofer');

document.addEventListener('DOMContentLoaded', () => {
  mostrarCiudades('#origen');
  mostrarCiudades('#destino');
  mostrarVentas();
});

btnBuscar?.addEventListener('click', realizarBusqueda);
btnRegistrarCliente?.addEventListener('submit', registrarCliente);
btnRegistrar?.addEventListener('click', () => {
  window.location.href = 'registro-clientes.html';
});

btnCalcularPrecio?.addEventListener('submit', calcularPrecioaRegistrar);
btnRegistrarConductor?.addEventListener('submit', registrarConductor)
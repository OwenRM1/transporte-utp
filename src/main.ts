import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase.config';
import { mostrarClientes } from './logica/registro-de-clientes/mostrar-clientes';
import { registrarCliente } from './logica/registro-de-clientes/registrar-cliente';
import { mostrarConductores } from './logica/registro-de-conductores/mostrar-conductor';
import { registrarConductor } from './logica/registro-de-conductores/registrar-conductor';
import { realizarBusqueda } from './logica/registro-de-ventas/buscar-cliente';
import { mostrarCiudades } from './logica/registro-de-ventas/mostrar-ciudades';
import { mostrarVentas } from './logica/registro-de-ventas/mostrar-ventas';
import { calcularPrecioaRegistrar } from './logica/registro-de-ventas/registrar-venta';
import './authentication/login';
import './authentication/register';
import './authentication/logout';
import { loginCheck } from './Utilidades/login-check';

const btnBuscar = document.getElementById('btnBuscar');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnCalcularPrecio = document.getElementById('registrar-venta');
const btnRegistrarCliente = document.getElementById('registrar-cliente');
const btnRegistrarConductor = document.getElementById('registrar-chofer');
onAuthStateChanged(auth, (user) => {
  loginCheck(user!);
  if (user) {
    console.log('Usuario logueado');
  } else {
    console.log('Usuario no logueado');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  mostrarCiudades('#origen');
  mostrarCiudades('#destino');
  mostrarVentas();
  mostrarClientes();
  mostrarConductores();
});

btnBuscar?.addEventListener('click', realizarBusqueda);
btnRegistrarCliente?.addEventListener('submit', registrarCliente);
btnRegistrar?.addEventListener('click', () => {
  window.location.href = 'registro-clientes.html';
});

btnCalcularPrecio?.addEventListener('submit', calcularPrecioaRegistrar);
btnRegistrarConductor?.addEventListener('submit', registrarConductor);

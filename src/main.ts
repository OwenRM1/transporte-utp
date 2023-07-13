import './authentication/login';
import './authentication/register';
import './authentication/logout';
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
import { loginCheck } from './Utilidades/login-check';
import { mostrarAsientos } from './logica/registro-de-ventas/mostrar-asientos';
import { Ciudad } from './interfaces/ciudad';
import { obtenerConductoryPrecio } from './peticiones/crud-conductor';
import { validarFecha } from './Utilidades/validar-fecha';

const btnBuscar = document.getElementById('btnBuscar');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnCalcularPrecio = document.getElementById('registrar-venta');
const btnRegistrarCliente = document.getElementById('registrar-cliente');
const btnRegistrarConductor = document.getElementById('registrar-chofer');
const inputFecha = document.getElementById('fecha');

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
  mostrarAsientos();
});

inputFecha?.addEventListener('click', async () => {
  const precioI = document.querySelector<HTMLInputElement>('#precio');
  const origen = document.querySelector<HTMLSelectElement>('#origen');
  const destino = document.querySelector<HTMLSelectElement>('#destino');
  const origenRuta: Ciudad = {
    nombre: origen!.value.split('-')[1].trim(),
    codigopostal: origen!.value.split('-')[0].trim(),
  };

  const destinoRuta: Ciudad = {
    nombre: destino!.value.split('-')[1].trim(),
    codigopostal: destino!.value.split('-')[0].trim(),
  };

  const [precio] = await obtenerConductoryPrecio(origenRuta.nombre, destinoRuta.nombre);
  precioI!.value = precio.toString();
});

btnBuscar?.addEventListener('click', realizarBusqueda);
btnRegistrarCliente?.addEventListener('submit', registrarCliente);
btnRegistrar?.addEventListener('click', () => {
  window.location.href = 'registro-clientes.html';
});

btnCalcularPrecio?.addEventListener('submit', calcularPrecioaRegistrar);
btnRegistrarConductor?.addEventListener('submit', registrarConductor);

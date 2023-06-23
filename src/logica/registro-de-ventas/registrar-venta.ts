import { Database } from 'firebase/database';
import { horaActual } from '../../Utilidades/hora-actual';
import { validarFecha } from '../../Utilidades/validar-fecha';
import { Ciudad } from '../../interfaces/ciudad';
import { Venta } from '../../interfaces/ventas';
import { obtenerConductoryPrecio } from '../../peticiones/crud-conductor';
import { generarVenta } from '../../peticiones/crud-ventas';
import { database } from '../../services/firebase.config';

export const calcularPrecioaRegistrar = async (e: Event) => {
  e.preventDefault();
  const nombre = document.querySelector<HTMLInputElement>('#nombre')!.value;
  const apellido = document.querySelector<HTMLInputElement>('#apellido')!.value;
  const dni = document.querySelector<HTMLInputElement>('#dni')!.value;
  const telefono = document.querySelector<HTMLInputElement>('#telefono')!.value;
  const origen = document.querySelector<HTMLSelectElement>('#origen');
  const destino = document.querySelector<HTMLSelectElement>('#destino');
  const fecha = document.querySelector<HTMLInputElement>('#fecha');
  const precioI = document.querySelector<HTMLInputElement>('#precio');
  const asiento = document.querySelector<HTMLInputElement>('#asiento')!.value;

  const hora = horaActual;

  const origenRuta: Ciudad = {
    nombre: origen!.value.split('-')[1].trim(),
    codigopostal: origen!.value.split('-')[0].trim(),
  };

  const destinoRuta: Ciudad = {
    nombre: destino!.value.split('-')[1].trim(),
    codigopostal: destino!.value.split('-')[0].trim(),
  };

  const [precio, conductor] = await obtenerConductoryPrecio(
    origenRuta.nombre,
    destinoRuta.nombre
  );
  precioI!.value = precio.toString();
  validarFecha(fecha!);

  const venta: Venta = {
    cliente: { nombre, apellido, dni, telefono },
    conductor,
    origen: origenRuta,
    destino: destinoRuta,
    fecha: fecha!.value.split('-').reverse().join('/'),
    hora,
    asiento,
    precio,
  };
  await registrarVenta(database, venta.cliente.dni, venta);
};

const registrarVenta = async (database: Database, idVenta: string, venta: Venta) => {
  await generarVenta(database, idVenta, venta);
};

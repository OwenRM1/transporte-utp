import { horaActual } from '../../Utilidades/hora-actual';
import { sweetMensaje } from '../../Utilidades/sweetMenaje';
import { Ciudad } from '../../interfaces/ciudad';
import { Venta } from '../../interfaces/ventas';
import { actualizarAsiento, buscarRuta } from '../../peticiones/crud-asientos';
import { obtenerConductoryPrecio } from '../../peticiones/crud-conductor';
import { generarVenta } from '../../peticiones/crud-ventas';
import { v4 as uuid } from 'uuid';

export const calcularPrecioaRegistrar = async (e: Event) => {
  e.preventDefault();
  const nombre = document.querySelector<HTMLInputElement>('#nombre')!.value;
  const apellido = document.querySelector<HTMLInputElement>('#apellido')!.value;
  const dni = document.querySelector<HTMLInputElement>('#dni')!.value;
  const telefono = document.querySelector<HTMLInputElement>('#telefono')!.value;
  const origen = document.querySelector<HTMLSelectElement>('#origen');
  const destino = document.querySelector<HTMLSelectElement>('#destino');
  const fecha = document.querySelector<HTMLInputElement>('#fecha');
  const asiento = document.querySelector<HTMLInputElement>('#asiento');
  const horaViaje = document.querySelector<HTMLInputElement>('#salida')!;
  const form = document.querySelector<HTMLFormElement>('#registrar-venta');

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

  const venta: Venta = {
    cliente: { nombre, apellido, dni, telefono },
    conductor,
    origen: origenRuta,
    destino: destinoRuta,
    fecha: fecha!.value.split('-').reverse().join('/'),
    horaVenta: hora,
    asiento: asiento!.value,
    precio,
    horaViaje: horaViaje!.value,
    id: uuid(),
  };

  const ruta = await buscarRuta(+asiento!.value, origenRuta.nombre, destinoRuta.nombre);

  await generarVenta(venta);

  await actualizarAsiento(
    { numero: ruta.asiento, ocupado: ruta.ocupado },
    origenRuta.nombre,
    destinoRuta.nombre
  );

  asiento!.value = '';
  form!.reset();
  
  sweetMensaje('Venta registrada correctamente', 'success');

  setTimeout(() => {
    location.reload();
  }, 1600);
};

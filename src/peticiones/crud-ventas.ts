import { Database, ref, set } from 'firebase/database';
import { Venta } from '../interfaces/ventas';

export const generarVenta = async (database: Database, idVenta: string, venta: Venta) => {
  try {
    await set(ref(database, `registrarventas/ventas/${idVenta}`), venta);
    console.log('Venta registrada exitosamente');
  } catch (error) {
    console.error('Error al registrar la venta:', error);
  }
};

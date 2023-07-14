import { Ciudad } from './ciudad';
import { Cliente } from './cliente';
import { Conductor } from './conductor';

export interface Venta {
  asiento: string;
  cliente: Cliente;
  conductor: Conductor;
  destino: Ciudad;
  fecha: string;
  horaVenta: string;
  origen: Ciudad;
  precio: number;
  horaViaje: string;
  id: string;
}

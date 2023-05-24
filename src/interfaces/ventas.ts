import { Ciudad } from './ciudad';
import { Cliente } from './cliente';
import { Conductor } from './conductor';

export interface Venta {
  asiento: string;
  cliente: Cliente;
  conductor: Conductor;
  destino: Ciudad;
  fecha: string;
  hora: string;
  origen: Ciudad;
  precio: number;
}

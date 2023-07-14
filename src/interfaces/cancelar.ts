export interface Cancelar {
  origen: string;
  destino: string;
  cliente: {
    dni: string;
    nombre: string;
    apellido: string;
  };
  motivo: string;
  emitido: string;
  id: string;
}

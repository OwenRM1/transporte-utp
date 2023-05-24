export interface Conductor {
  apellido: string;
  correo: string;
  dni: string;
  licencia: string;
  nombre: string;
  ruta: string;
  telefono: string;
}

export const conductorDefault: Conductor = {
  nombre: 'ruta no disponible',
  apellido: 'ruta no disponible',
  ruta: 'ruta no disponible',
  telefono: 'ruta no disponible',
  licencia: 'ruta no disponible',
  correo: 'ruta no disponible',
  dni: 'ruta no disponible',
};

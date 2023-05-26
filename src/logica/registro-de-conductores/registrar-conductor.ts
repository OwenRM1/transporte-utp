import { Conductor } from '../../interfaces/conductor';
import { crearConductor } from '../../peticiones/crud-conductor';
import { database } from '../../services/firebase.confing';

export const registrarConductor = async (e: Event) => {
  e.preventDefault();
  const apellido = document.querySelector<HTMLInputElement>('#re-con-apellido')!.value;
  const correo = document.querySelector<HTMLInputElement>('#re-con-correo')!.value;
  const dni = document.querySelector<HTMLInputElement>('#re-con-dni')!.value;
  const licencia = document.querySelector<HTMLInputElement>('#re-con-licencia')!.value;
  const nombre = document.querySelector<HTMLInputElement>('#re-con-nombre')!.value;
  const ruta = document.querySelector<HTMLSelectElement>('#re-con-ruta')!.value;
  const telefono = document.querySelector<HTMLInputElement>('#re-con-telefono')!.value;

  const conductor: Conductor = {
    apellido,
    correo,
    dni,
    licencia,
    nombre,
    ruta,
    telefono,
  };
  
  await crearConductor(database, conductor.dni, conductor);
};

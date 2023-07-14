import Swal from 'sweetalert2';

export const sweetMensaje = (mensaje: string, tipo: string = 'success') => {
  Swal.fire({
    position: 'center',
    icon: tipo === 'error' ? 'error' : 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 1600,
  });
};

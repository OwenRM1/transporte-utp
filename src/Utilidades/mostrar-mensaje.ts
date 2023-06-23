import Toastify from 'toastify-js';

export const mostrarMensaje = (mensaje: string, tipo: string = 'success'): void => {
  Toastify({
    text: mensaje,
    duration: 1200,
    newWindow: true,
    stopOnFocus: true,
    style: {
      padding: '20px',
      background: tipo === 'error' ? 'red' : 'green',
      color: '#fff',
      width: '200px',
      height: '25px',
      position: 'absolute',
      top: '10px',
      right: '10px',
    },
    onClick: function () {},
  }).showToast();
};

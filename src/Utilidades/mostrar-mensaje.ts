import Toastify from 'toastify-js';

export const mostrarMensaje = (mensaje: string, tipo: string = 'success'): void => {
  Toastify({
    text: mensaje,
    duration: 1200,
    newWindow: true,
    stopOnFocus: true,
    style: {
      padding: '20px',
      background: tipo === 'error' ? '#ff0000' : '#00ff00',
      color: '#fff',
      width: '200px',
      height: '20px',
      position: 'absolute',
      top: '10px',
      right: '10px',
    },
    onClick: function () {},
  }).showToast();
};

import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase.config';

const cerrarSesion = document.querySelector('#cerrar-sesion');

cerrarSesion?.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = '../../index.html';
  console.log('sesion cerrada');
});

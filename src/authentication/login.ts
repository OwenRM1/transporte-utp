import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase.config';
import { FirebaseError } from 'firebase/app';
import { mostrarMensaje } from '../Utilidades/mostrar-mensaje';

if (window.location.pathname === '/index.html') {
  const formularioLogin = document.getElementById('login');
  formularioLogin!.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = (formularioLogin as HTMLFormElement)!['login-email'].value;
    const password = (formularioLogin as HTMLFormElement)!['login-password'].value;

    try {
      const credencial = await signInWithEmailAndPassword(auth, email, password);
      mostrarMensaje(`Usuario ${credencial.user?.email} Bienvenido`);
      window.location.href = '../../ventas.html';
    } catch (error) {
      const errorCode = (error as FirebaseError).code;
      const errorMessage = (error as FirebaseError).message;
      if (errorCode === 'auth/wrong-password') {
        mostrarMensaje('Contraseña incorrecta', 'error');
      } else if (errorCode === 'auth/user-not-found') {
        mostrarMensaje('Usuario no encontrado', 'error');
      } else {
        mostrarMensaje(errorMessage, 'error');
      }
    }
  });
}

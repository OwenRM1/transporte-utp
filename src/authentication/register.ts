import { AuthErrorCodes, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase.config';
import { FirebaseError } from 'firebase/app';
import { mostrarMensaje } from '../Utilidades/mostrar-mensaje';

const formularioRegistro = document.getElementById('registro');

if (window.location.pathname === '/registrate.html') {
  formularioRegistro!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (formularioRegistro as HTMLFormElement)!['registro-email'].value;
    const password = (formularioRegistro as HTMLFormElement)!['registro-password'].value;

    console.log(email);
    console.log(password);
    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credencial);
    } catch (error) {
      const errorCode = (error as FirebaseError).code;
      const errorMessage = (error as FirebaseError).message;
      if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
        mostrarMensaje('El correo ya está registrado', 'error');
      } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
        mostrarMensaje('El correo no es válido', 'error');
      } else if (errorCode === AuthErrorCodes.WEAK_PASSWORD) {
        mostrarMensaje('La contraseña es muy débil', 'error');
      } else {
        mostrarMensaje(errorMessage, 'error');
      }
    }
  });
}

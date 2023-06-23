import { User } from 'firebase/auth';

const loggedOut = document.querySelectorAll<HTMLLIElement>('.logget-out');
const loggedIn = document.querySelectorAll<HTMLLIElement>('.logget-in');

export const loginCheck = (user: User) => {
  if (user) {
    loggedIn.forEach((link) => (link.style.display = 'block'));
    loggedOut.forEach((link) => (link.style.display = 'none'));
  } else {
    loggedIn.forEach((link) => (link.style.display = 'none'));
    loggedOut.forEach((link) => (link.style.display = 'block'));
  }
};

const formularioLogin = document.getElementById('login');

if (window.location.pathname === '/login.html') {
  formularioLogin!.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('enviando datos');
  });
}

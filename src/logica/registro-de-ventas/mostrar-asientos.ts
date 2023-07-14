import { buscarRuta, listarAsientos } from '../../peticiones/crud-asientos';

export const mostrarAsientos = async () => {
  const rutas = await listarAsientos();

  const asientos = document.querySelector<HTMLSelectElement>('#asiento');

  const selectOrigen = document.querySelector<HTMLSelectElement>('#origen');
  const selectDestino = document.querySelector<HTMLSelectElement>('#destino');
  const horaSalida = document.querySelector<HTMLInputElement>('#salida');

  selectOrigen?.addEventListener('change', generarOpcionesAsientos);
  selectDestino?.addEventListener('change', generarOpcionesAsientos);

  async function generarOpcionesAsientos() {
    // Guarda la selección actual
    const seleccionActual = asientos!.value;
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // Limpia las opciones actuales
    limpiarSelect(asientos!);

    if (selectOrigen!.value === '' && selectDestino!.value === '') {
      alert('Seleccione una ciudad de origen y destino');
      return;
    }

    const origen = selectOrigen!.value.split(' - ')[1];
    const destino = selectDestino!.value.split(' - ')[1];

    rutas.forEach((ruta) => {
      const dataFiltrada = ruta.filter(
        (asiento) =>
          asiento.ocupado !== true &&
          asiento.origen === origen &&
          asiento.destino === destino
      );

      dataFiltrada.forEach((asiento) => {
        const options = document.createElement('option');
        options.value = `${asiento.asiento}`;
        options.textContent = `${asiento.asiento}`;
        asientos?.appendChild(options);
        horaSalida!.value = `${asiento.salida} horas`;
      });
    });

    if (origen === destino) {
      alert('seleccione ciudades diferentes');
      selectOrigen!.value = '';
      selectDestino!.value = '';
    }

    // Restablece la selección
    asientos!.value = seleccionActual;
  }
};

function limpiarSelect(html: HTMLSelectElement | HTMLOptionElement) {
  while (html.firstChild) {
    html.removeChild(html.firstChild);
  }
}

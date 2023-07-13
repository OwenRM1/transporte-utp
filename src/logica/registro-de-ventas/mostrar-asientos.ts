import { listarAsientos } from '../../peticiones/crud-asientos';

export const mostrarAsientos = async () => {
  const rutas = await listarAsientos();

  const asientos = document.querySelector<HTMLSelectElement>('#asiento');

  asientos?.addEventListener('click', () => {
    limpiarSelect(asientos!);

    let selectOrigen = document.querySelector<HTMLSelectElement>('#origen');
    let selectDestino = document.querySelector<HTMLSelectElement>('#destino');

    if (selectOrigen!.value === '' && selectDestino!.value === '') {
      alert('Seleccione una ciudad de origen y destino');
      return;
    }

    const origen = selectOrigen!.value.split(' - ')[1].trim();
    const destino = selectDestino!.value.split(' - ')[1].trim();

    rutas.forEach((ruta) => {
      const dataFiltrada = ruta.filter((asiento) => asiento.ocupado !== true);
      dataFiltrada.forEach((asiento) => {
        const options = document.createElement('option');
        if (asiento.origen === origen && asiento.destino === destino) {
          options.value = `${asiento.asiento}`;
          options.textContent = `${asiento.asiento}`;
          asientos?.appendChild(options);
        }
      });
    });
    if (origen === destino) {
      alert('seleccione ciudades diferentes');
      selectOrigen!.value = '';
      selectDestino!.value = '';
      return;
    }
  });
};

function limpiarSelect(html: HTMLSelectElement | HTMLOptionElement) {
  while (html.firstChild) {
    html.removeChild(html.firstChild);
  }
}

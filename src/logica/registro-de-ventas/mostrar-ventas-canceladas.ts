import { Cancelar } from '../../interfaces/cancelar';
import { axiosI } from '../../peticiones/axios';
import { BASE_URL_DEV } from '../../variables';
import { eliminarVentaCanceladas } from '../../peticiones/crud-ventas';

export const mostrarVentasCanceladas = async () => {
  const tabla = document.querySelector<HTMLTableElement>('#tabla-cancelar');
  const insertarModal = document.querySelector<HTMLDivElement>('#insertar-cancelados');

  if (window.location.href === `${BASE_URL_DEV}/cancelar-venta.html`) {
    const listarCancelados = async (): Promise<Cancelar[]> => {
      const response = await axiosI.get<Cancelar[]>('ventascanceladas.json');
      return Object.values(response.data);
    };

    const ventasCanceladas = await listarCancelados();

    ventasCanceladas.forEach((venta) => {
      const row = (tabla!.insertRow() as HTMLTableRowElement) ?? [];
      row.innerHTML = `
        <td>${venta.origen}</td>
        <td>${venta.destino}</td>
        <td>${venta.cliente.dni}</td>
        <td>${venta.cliente.nombre} ${venta.cliente.apellido}</td>
        <td>${venta.motivo}</td>
        <td>${venta.emitido}</td>
        <td><a href="#" id="cancelar-eliminar">Eliminar</a></td>
      `;
      const eliminarVentas = row.querySelector<HTMLAnchorElement>('#cancelar-eliminar');
      eliminarVentas!.addEventListener('click', async (e) => {
        e.preventDefault();
        const confirmacion = confirm('¿Está seguro de Eliminar esta venta cancelada?');
        if (confirmacion) {
          await eliminarVentaCanceladas(venta.id);
          row.remove();
        }
      });
    });
  }
};

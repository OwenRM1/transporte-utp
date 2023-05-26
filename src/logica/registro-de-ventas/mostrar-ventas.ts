import { Venta } from '../../interfaces/ventas';
import { listarVentas, eliminarVenta, editarVenta } from '../../peticiones/crud-ventas';
import '../../css/style.css';
import { mostrarCiudades } from './mostrar-ciudades';
import { Ciudad } from '../../interfaces/ciudad';
import { obtenerConductoryPrecio } from '../../peticiones/crud-conductor';
import { horaActual } from '../../Utilidades/hora-actual';
import { BASE_URL_DEV } from '../../variables';

export const mostrarVentas = async () => {
  const tabla = document.querySelector<HTMLTableElement>('#tabla-ventas');
  const ventas: Venta[] = await listarVentas();
  const insertarModal = document.querySelector<HTMLDivElement>('#insertar-modal');

  function abrirModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer!.style.display = 'block';
  }

  function cerrarModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer!.style.display = 'none';
  }

  if (window.location.href === `${BASE_URL_DEV}/viajes.html`) {
    ventas.forEach((venta) => {
      const row = (tabla!.insertRow() as HTMLTableRowElement) ?? [];

      row.innerHTML = `
      <td>${venta.origen.nombre}</td>
      <td>${venta.destino.nombre}</td>
      <td>${venta.cliente.nombre} ${venta.cliente.apellido.split(' ')[0]}</td>
      <td>${venta.conductor.nombre} ${venta.conductor.apellido.split(' ')[0]}</td>
      <td>${venta.asiento}</td>
      <td>${venta.fecha}</td>
      <td>${venta.precio}</td>
      <td><a href="#" id="editar-venta">Editar</a></td>
      <td><a href="#" id="eliminar-venta">Eliminar</a></td>
    `;

      const eliminarEstaVenta = row.querySelector<HTMLAnchorElement>('#eliminar-venta');
      eliminarEstaVenta!.addEventListener('click', async (e) => {
        e.preventDefault();

        const confirmacion = confirm('¿Está seguro de eliminar esta venta?');
        if (confirmacion) {
          await eliminarVenta(venta.cliente.dni);
          row.remove();
        }
      });

      const editarEstaVenta = row.querySelector<HTMLAnchorElement>('#editar-venta');
      editarEstaVenta!.addEventListener('click', (e) => {
        e.preventDefault();

        mostrarCiudades('#di-origen', true, venta.origen.nombre);
        mostrarCiudades('#di-destino', true, venta.destino.nombre);

        insertarModal!.innerHTML = `
          <div id="modal-container" >
            <div id="modal-content">
              <span id="close-modal-btn">&times;</span>
              <h2>Editar Venta</h2>
              <form id="editar-venta-form">
                <label for="di-origen">Origen:</label>
                <select name="di-origen" id="di-origen" required>
                </select>

                <label for="di-destino">Destino:</label>
                <select name="di-destino" id="di-destino" required >
                </select>

                <label for="di-nombre">nombres:</label>
                <input type="text" id="di-nombre" name="di-nombre" value=${
                  venta.cliente.nombre
                } />

                <label for="di-apellido">Apellidos:</label>
                <input type="text" id="di-apellido" name="di-apellido" value=${
                  venta.cliente.apellido
                } />

                <label for="di-dni">DNI:</label>
                <input type="text" id="di-dni" name="di-dni" value=${
                  venta.cliente.dni
                } maxlength="8" />

                <label for="di-telefono">Telefono:</label>
                <input type="text" id="di-telefono" name="di-telefono" value=${
                  venta.cliente.telefono
                } />

                <label for="di-correo">Correo:</label>
                <input type="email" id="di-correo" name="di-correo" value=${
                  venta.cliente.correo
                } />

                <label for="di-asiento">Asiento:</label>
                <input type="text" id="di-asiento" name="di-asiento" value=${
                  venta.asiento
                } />

                <label for="di-fecha">Fecha:</label>
                <input type="date" id="di-fecha" name="di-fecha" value=${venta.fecha
                  .split('/')
                  .reverse()
                  .join('-')} />

                <label for="di-precio">Precio:</label>
                <input type="text" id="di-precio" name="di-precio" value=${
                  venta.precio
                } />
                
              <button type="submit">Guardar</button>
            </form>
          </div>
        </div>
        `;

        const btnActualizar =
          document.querySelector<HTMLButtonElement>('#editar-venta-form');

        btnActualizar?.addEventListener('submit', async (e) => {
          e.preventDefault();
          const nombre = document.querySelector<HTMLInputElement>('#di-nombre')!.value;
          const apellido =
            document.querySelector<HTMLInputElement>('#di-apellido')!.value;
          const dni = document.querySelector<HTMLInputElement>('#di-dni')!.value;
          const telefono =
            document.querySelector<HTMLInputElement>('#di-telefono')!.value;
          const origen = document.querySelector<HTMLSelectElement>('#di-origen');
          const destino = document.querySelector<HTMLSelectElement>('#di-destino');
          const precioI = document.querySelector<HTMLInputElement>('#di-precio');
          const fecha = document.querySelector<HTMLInputElement>('#di-fecha');
          const asiento = document.querySelector<HTMLInputElement>('#di-asiento')!.value;
          const hora = horaActual;
          const origenRuta: Ciudad = {
            nombre: origen!.value.split('-')[1].trim(),
            codigopostal: origen!.value.split('-')[0].trim(),
          };

          const destinoRuta: Ciudad = {
            nombre: destino!.value.split('-')[1].trim(),
            codigopostal: destino!.value.split('-')[0].trim(),
          };

          const [precio, conductor] = await obtenerConductoryPrecio(
            origenRuta.nombre,
            destinoRuta.nombre
          );
          precioI!.value = precio.toString();

          const ventaActualizada: Venta = {
            cliente: { nombre, apellido, dni, telefono },
            conductor,
            origen: origenRuta,
            destino: destinoRuta,
            fecha: fecha!.value.split('-').reverse().join('/'),
            hora,
            asiento,
            precio,
          };
          await editarVenta(venta.cliente.dni, ventaActualizada);
          cerrarModal();
        });

        const confirmacion = confirm('¿Está seguro de editar esta venta?');
        if (confirmacion) {
          abrirModal();
        }

        const modalContainer = document.getElementById('modal-container');
        const closeModalBtn = document.getElementById('close-modal-btn');

        closeModalBtn!.addEventListener('click', cerrarModal);

        window.addEventListener('click', (event) => {
          if (event.target === modalContainer) {
            cerrarModal();
          }
        });
      });
    });
  }
};

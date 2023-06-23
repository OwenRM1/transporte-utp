import { BASE_URL_DEV } from '../../variables';
import {
  editarConductor,
  eliminarConductor,
  listarConductores,
} from '../../peticiones/crud-conductor';
import { Conductor } from '../../interfaces/conductor';

export const mostrarConductores = async () => {
  const tabla = document.querySelector<HTMLTableElement>('#tabla-conductor');
  const conductores: Conductor[] = await listarConductores();
  const insertarModal = document.querySelector<HTMLDivElement>(
    '#insertar-modal-conductor'
  );

  function abrirModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer!.style.display = 'block';
  }

  function cerrarModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer!.style.display = 'none';
  }

  if (window.location.href === `${BASE_URL_DEV}/conductores.html`) {
    Object.values(conductores).forEach((conductor) => {
      const row = tabla!.insertRow() as HTMLTableRowElement;
      row.innerHTML = `
        <td>${conductor.dni}</td>
        <td>${conductor.nombre}</td>
        <td>${conductor.apellido}</td>
        <td>${conductor.ruta}</td>
        <td>${conductor.licencia}</td>
        <td>${conductor.correo}</td>
        <td>${conductor.telefono}</td>
        <td><a href="#" id="editar-conductor">Editar</a></td>
        <td><a href="#" id="eliminar-conductor">Eliminar</a></td>
      `;

      const eliminarEstaVenta =
        row.querySelector<HTMLAnchorElement>('#eliminar-conductor');
      eliminarEstaVenta!.addEventListener('click', async (e) => {
        e.preventDefault();

        const confirmacion = confirm('¿Está seguro de eliminar este cliente?');
        if (confirmacion) {
          await eliminarConductor(conductor.dni);
          row.remove();
        }
      });

      const editarEstaVenta = row.querySelector<HTMLAnchorElement>('#editar-conductor');
      editarEstaVenta!.addEventListener('click', (e) => {
        e.preventDefault();

        insertarModal!.innerHTML = `
          <div id="modal-container" >
            <div id="modal-content">
              <span id="close-modal-btn">&times;</span>
              <h2>Editar Conductor</h2>
              <form id="editar-conductor-form">

                <label for="con-nombre">nombres:</label>
                <input type="text" id="con-nombre" name="con-nombre" value=${
                  conductor.nombre
                } />

                <label for="con-apellido">Apellidos:</label>
                <input type="text" id="con-apellido" name="con-apellido" value=${
                  conductor.apellido
                } />

                <label for="con-dni">DNI:</label>
                <input type="text" id="con-dni" name="con-dni" value=${
                  conductor.dni
                } maxlength="8" />

                <label for="con-telefono">Telefono:</label>
                <input type="text" id="con-telefono" name="con-telefono" value=${conductor.telefono.toString()} />

                <label for="con-correo">Correo:</label>
                <input type="email" id="con-correo" name="con-correo" value=${
                  conductor.correo
                } />

                <label for="con-licencia">Licencia:</label>
                <input type="text" id="con-licencia" name="con-licencia" value=${
                  conductor.licencia
                } />

                <label for="con-ruta">Ruta</label>
                <select name="con-ruta" id="con-ruta">
                  <option selected disabled>Seleccione una opcion</option>
                  <option value="Huancayo - Lima">Huancayo - Lima</option>
                  <option value="Lima - Pucallpa">Lima - Pucallpa</option>
                  <option value="Huancayo - Pucallpa">Huancayo - Pucallpa</option>
                  <option value="Huanuco - Huancayo">Huanuco - Huancayo</option>
                  <option value="Huanuco - Lima">Huanuco - Lima</option>
                  <option value="Pucallpa - Huanuco">Pucallpa - Huanuco</option>
                </select>
                
              <button type="submit">Actualizar</button>
            </form>
          </div>
        </div>
        `;

        const btnActualizar = document.querySelector<HTMLButtonElement>(
          '#editar-conductor-form'
        );

        btnActualizar?.addEventListener('submit', async (e) => {
          e.preventDefault();
          const dni = document.querySelector<HTMLInputElement>('#con-dni')!.value;
          const nombre = document.querySelector<HTMLInputElement>('#con-nombre')!.value;
          const apellido =
            document.querySelector<HTMLInputElement>('#con-apellido')!.value;
          const correo = document.querySelector<HTMLSelectElement>('#con-correo')!.value;
          const telefono =
            document.querySelector<HTMLInputElement>('#con-telefono')!.value;
          const ruta = document.querySelector<HTMLSelectElement>('#con-ruta')!.value;
          const licencia =
            document.querySelector<HTMLInputElement>('#con-licencia')!.value;

          const conductorActualizado: Conductor = {
            dni,
            nombre,
            apellido,
            ruta,
            licencia,
            correo,
            telefono,
          };

          await editarConductor(conductor.dni, conductorActualizado);
          cerrarModal();
        });

        const confirmacion = confirm('¿Está seguro de editar este Cliente?');
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

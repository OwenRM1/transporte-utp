import '../../css/style.css';
import { BASE_URL_DEV } from '../../variables';
import {
  editarCliente,
  eliminarCliente,
  listarClientes,
} from '../../peticiones/crud-clientes';
import { Cliente } from '../../interfaces/cliente';

export const mostrarClientes = async () => {
  const tabla = document.querySelector<HTMLTableElement>('#tabla-clientes');
  const clientes: Cliente = await listarClientes();
  const insertarModal = document.querySelector<HTMLDivElement>(
    '#insertar-modal-clientes'
  );

  function abrirModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer!.style.display = 'block';
  }

  function cerrarModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer!.style.display = 'none';
  }

  if (window.location.href === `${BASE_URL_DEV}/clientes.html`) {
    Object.values(clientes).forEach((cliente: Cliente) => {
      const row = tabla!.insertRow() as HTMLTableRowElement;
      row.innerHTML = `
        <td>${cliente.dni}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        <td>${cliente.correo}</td>
        <td>${cliente.telefono}</td>
        <td><a href="#" id="editar-cliente">Editar</a></td>
        <td><a href="#" id="eliminar-cliente">Eliminar</a></td>
      `;

      const eliminarEstaVenta = row.querySelector<HTMLAnchorElement>('#eliminar-cliente');
      eliminarEstaVenta!.addEventListener('click', async (e) => {
        e.preventDefault();

        const confirmacion = confirm('¿Está seguro de eliminar este cliente?');
        if (confirmacion) {
          await eliminarCliente(cliente.dni);
          row.remove();
        }
      });

      const editarEstaVenta = row.querySelector<HTMLAnchorElement>('#editar-cliente');
      editarEstaVenta!.addEventListener('click', (e) => {
        e.preventDefault();

        insertarModal!.innerHTML = `
          <div id="modal-container" >
            <div id="modal-content">
              <span id="close-modal-btn">&times;</span>
              <h2>Editar Cliente</h2>
              <form id="editar-cliente-form">

                <label for="cli-nombre">nombres:</label>
                <input type="text" id="cli-nombre" name="cli-nombre" value=${cliente.nombre} />

                <label for="cli-apellido">Apellidos:</label>
                <input type="text" id="cli-apellido" name="cli-apellido" value=${cliente.apellido} />

                <label for="cli-dni">DNI:</label>
                <input type="text" id="cli-dni" name="cli-dni" value=${cliente.dni} maxlength="8" />

                <label for="cli-telefono">Telefono:</label>
                <input type="text" id="cli-telefono" name="cli-telefono" value=${cliente.telefono} />

                <label for="cli-correo">Correo:</label>
                <input type="email" id="cli-correo" name="cli-correo" value=${cliente.correo} />
                
              <button type="submit">Guardar</button>
            </form>
          </div>
        </div>
        `;

        const btnActualizar =
          document.querySelector<HTMLButtonElement>('#editar-cliente-form');

        btnActualizar?.addEventListener('submit', async (e) => {
          e.preventDefault();
          const dni = document.querySelector<HTMLInputElement>('#cli-dni')!.value;
          const nombre = document.querySelector<HTMLInputElement>('#cli-nombre')!.value;
          const apellido =
            document.querySelector<HTMLInputElement>('#cli-apellido')!.value;
          const correo = document.querySelector<HTMLSelectElement>('#cli-correo');
          const telefono =
            document.querySelector<HTMLInputElement>('#cli-telefono')!.value;

          const clienteActualizado: Cliente = {
            dni,
            nombre,
            apellido,
            correo: correo!.value,
            telefono,
          };

          await editarCliente(cliente.dni, clienteActualizado);
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

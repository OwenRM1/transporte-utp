export const validarFecha = (inputFecha: HTMLInputElement): void => {
  inputFecha.addEventListener('change', () => {
    const fechaIngresada = new Date(inputFecha.value);

    const fechaActual = new Date();

    if (fechaIngresada <= fechaActual) {
      inputFecha.value = '';
    }
  });
};

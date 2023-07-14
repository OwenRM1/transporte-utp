import { Cancelar } from "../interfaces/cancelar";
import { axiosI } from "./axios";

export const cancelarVentaPOST = async (venta: Cancelar) => {
  const response = await axiosI.post('ventascanceladas.json', venta);
  return response.data;
}
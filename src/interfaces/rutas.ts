export interface Ruta {
  a: string;
  asientos: Asientos;
  de: string;
}

export interface Asientos {
  asiento1: Asiento;
  asiento2: Asiento;
  asiento3: Asiento;
  asiento4: Asiento;
  asiento5: Asiento;
}

export interface Asiento {
  numero: number;
  ocupado: boolean;
}

export interface RutaI {
  origen: string;
  destino: string;
  asiento: number;
  ocupado: boolean;
}

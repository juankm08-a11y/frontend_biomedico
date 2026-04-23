export interface EquipoRequest {
    nombre:string;
    marca:number;
    modelo:number;
    serie:string;
    fabricante:number;
    tipoTecnologia:number;
    ubicacion:number;
    placa:string;
}

export interface EquipoResponse {
    idEquipo:number
    nombre:string
    marca:number
    modelo:number
    serie:string
    fabricante:number
    tipoTecnologia:number
    ubicacion:number
    fechaRegistro:string
    placa:string
}

export interface QRResponse {
    equipo:number
    nombre:string
    qr:string
    fechGeneracion:string
}

export interface ArchivoAdjuntoResponse {
    id:number,
    nombre:string,
    archivo:string,
    extension:string,
    tipo:string,
    ruta?: string | null
    fechaSubida:string
}
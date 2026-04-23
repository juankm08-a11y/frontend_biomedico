export interface UsuarioRequest {
  id: number;
  nombre: string;
  correo: string;
  password: string;
  rol:
    | "superadministrador"
    | "administrador"
    | "coordinador"
    | "ingenierobiomedico"
    | "tecnicobiomedico";
  estado: "activo" | "inactivo";
}

export interface UsuarioResponse {
  id: number;
  nombre: string;
  correo: string;
  rol:
    | "superadministrador"
    | "administrador"
    | "coordinador"
    | "ingenierobiomedico"
    | "tecnicobiomedico";
  estado: "activo" | "inactivo";
}

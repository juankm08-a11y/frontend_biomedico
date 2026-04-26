export interface LoginRequest {
    correo:string 
    password:string
}

export interface LoginResponse {
    message:string;
    password:string;
    rol:string;
}
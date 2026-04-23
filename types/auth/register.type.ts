export interface RegisterRequest {
    nombre:string 
    correo:string
    password:string
    rol:string 
}

export interface RegisterResponse {
    id:number
    nombre:string 
    correo:string 
    rol:string 
}
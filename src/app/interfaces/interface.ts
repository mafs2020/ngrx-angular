export interface IUsuario{
    id?: number;
    nombre: string;
    apellido: string;
    edad: number;
    image?: string;
}

export interface IModal {
    motivo: string;
    modalContent: string;
}
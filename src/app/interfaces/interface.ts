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

export interface IPaginacion{
    url?: string;
    next?: boolean;
    prev?: string;
    rows?: IUsuario[];
    count?: number;
    total?: number;
}
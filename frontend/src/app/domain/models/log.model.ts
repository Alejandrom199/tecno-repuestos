export interface LogAuditoria {
  id: number;
  usuario: string;
  accion: string;
  entidad: string;
  detalles: any;
  createdAt: string; 
}
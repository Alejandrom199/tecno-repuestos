import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs'; // Importar map
import { LogAuditoria } from '../../../../../domain/models/log.model';
import { AuditoriaRepository } from '../../../../../domain/repositories/auditoria.repository';

@Component({
  selector: 'app-visor-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visor-logs.html',
  styleUrl: './visor-logs.scss',
})
export class VisorLogs {
  public logs$: Observable<LogAuditoria[]>;

  constructor(private auditoriaRepo: AuditoriaRepository) {
    // Usamos pipe(map(...)) para extraer el array 'data' si es necesario
    this.logs$ = this.auditoriaRepo.getLogs().pipe(
      map((res: any) => {
        // Si res es array, lo pasa. Si tiene propiedad 'data', extrae el array.
        return Array.isArray(res) ? res : (res.data || []);
      })
    );
  }
}
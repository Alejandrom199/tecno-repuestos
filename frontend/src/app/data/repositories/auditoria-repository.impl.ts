import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuditoriaRepository } from '../../domain/repositories/auditoria.repository';
import { LogAuditoria } from '../../domain/models/log.model';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaRepositoryImpl extends AuditoriaRepository {
  private apiUrl = `${environment.apiUrl}/auditoria`;

  constructor(private http: HttpClient) {
    super();
  }

  getLogs(): Observable<LogAuditoria[]> {
    return this.http.get<LogAuditoria[]>(this.apiUrl, { withCredentials: true });
  }
}
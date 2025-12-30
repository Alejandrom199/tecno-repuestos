import { Observable } from 'rxjs';
import { LogAuditoria } from '../models/log.model';

export abstract class AuditoriaRepository {
  abstract getLogs(): Observable<LogAuditoria[]>;
}
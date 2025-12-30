import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisorLogs } from './pages/visor-logs/visor-logs';

const routes: Routes = [
  { path: '', component: VisorLogs }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLogsRoutingModule { }
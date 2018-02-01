import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PresencaComponent } from "./presenca/presenca.component";
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        component: PresencaComponent
      }
    ])
  ]
})
export class RelatorioRouting { }
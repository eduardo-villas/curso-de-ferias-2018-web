import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'main', 
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'usuario',
            loadChildren: './usuario/usuario.module#UsuarioModule'
          },
          {
            path: 'disciplina',
            loadChildren: './disciplina/disciplina.module#DisciplinaModule'
          },
          {
            path: 'relatorio',
            loadChildren: './relatorio/relatorio.module#RelatorioModule'
          }
        ]
      }
    ])
  ]
})
export class MainRouting { }
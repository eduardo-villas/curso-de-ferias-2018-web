import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConsultaComponent, FormularioComponent]
})
export class UsuarioModule { }

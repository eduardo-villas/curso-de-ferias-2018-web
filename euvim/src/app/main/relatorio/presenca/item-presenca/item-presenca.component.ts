import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-item-presenca',
  templateUrl: './item-presenca.component.html',
  styleUrls: ['./item-presenca.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemPresencaComponent implements OnInit {

  @Input("dataInicio")
  private cursoInicio:Date;
  @Input("dataFim")
  private cursoFim:Date;
  @Input()
  private periodoInicial:Date;
  @Input()
  private periodoFinal:Date;
  @Input()
  private presencas:Array<any>=[];

  public listPresenca=[];

  constructor() { }

  ngOnInit() {
    let inicio = moment(this.cursoInicio).isSameOrAfter(this.periodoInicial) ? this.cursoInicio : this.periodoInicial;   
    let fim = moment(this.cursoFim).isSameOrBefore(this.periodoFinal) ? this.cursoFim : this.periodoFinal;
    let dataCurso = moment(inicio);
    while(dataCurso.isSameOrBefore(fim)){
      if(dataCurso.weekday()>1 && dataCurso.weekday()<7){
        this.listPresenca.push({date: dataCurso.toDate(), presente : this.presencas.includes(dataCurso.format("YYYY-MM-DD")) })
      }
      dataCurso.add(1, 'days');
    } 
  }

}
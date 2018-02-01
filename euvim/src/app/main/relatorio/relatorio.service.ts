import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class RelatorioService {

  private _urlRelatorio = environment.url+"/api/v1/relatorio";

  constructor(private _httpClient: HttpClient) { }
  
  listarPresencaPorDisciplina(filter){
    let httpParams = new HttpParams()
    .append("dataInicio", moment(filter.dataInicio).format("YYYY-MM-DD"))
    .append("dataFim", moment(filter.dataFim).format("YYYY-MM-DD"));
    return this._httpClient.get<Array<any>>(this._urlRelatorio + "/" + filter.disciplina, {params: httpParams});
  }

}
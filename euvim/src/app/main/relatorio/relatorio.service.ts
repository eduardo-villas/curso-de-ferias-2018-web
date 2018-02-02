import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class RelatorioService {

  constructor(private _httpClient:HttpClient ) {}

  private _urlRelatorio = environment.URL+"/api/v1/relatorio";

  getPresencaDisciplina(filter){
    let httpParams = new HttpParams().append("dataInicio",moment(filter.dataInicio).format("YYYY-MM-DDD"))
                                     .append("dataFim",moment(filter.dataFim).format("YYYY-MM-DDD"));
    return this._httpClient.get<Array<any>>(this._urlRelatorio+"/"+filter.disciplina, {params:httpParams});
  }
}
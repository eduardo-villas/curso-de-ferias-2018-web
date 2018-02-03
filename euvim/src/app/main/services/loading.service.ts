import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  public isLoading = false;
  private isLoadingChange = new Subject<Boolean>();

  constructor() {
    this.isLoadingChange.next(false);
  }
  
  public callNextStatus(status:boolean){
    this.isLoading = status;
    this.isLoadingChange.next(this.isLoading);
  }

  public getLoading(): Observable<any> {
    return this.isLoadingChange.asObservable();
  }

}
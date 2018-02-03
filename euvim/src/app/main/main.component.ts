import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {
 
  private isLoadingSubscription: Subscription;
  public loading: Boolean;

  constructor(private _loadingService:LoadingService) { }

  ngOnInit() {
    this.loading = this._loadingService.isLoading;
    this.isLoadingSubscription = this._loadingService.getLoading().subscribe(valor=>{      
       setTimeout(()=>{
        this.loading = valor;  
       },1);
    });
  }


  ngOnDestroy(){
    if(this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }

}
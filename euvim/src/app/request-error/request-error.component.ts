import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-request-error',
  templateUrl: './request-error.component.html',
  styleUrls: ['./request-error.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequestErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
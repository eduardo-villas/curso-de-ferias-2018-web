import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPresencaComponent } from './item-presenca.component';

describe('ItemPresencaComponent', () => {
  let component: ItemPresencaComponent;
  let fixture: ComponentFixture<ItemPresencaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPresencaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

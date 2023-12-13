import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuckNorrisFactComponent } from './chuck-norris-fact.component';

describe('ChuckNorrisFactComponent', () => {
  let component: ChuckNorrisFactComponent;
  let fixture: ComponentFixture<ChuckNorrisFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChuckNorrisFactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChuckNorrisFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

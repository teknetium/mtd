import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTypeDemoComponent } from './file-type-demo.component';

describe('FileTypeDemoComponent', () => {
  let component: FileTypeDemoComponent;
  let fixture: ComponentFixture<FileTypeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTypeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTypeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

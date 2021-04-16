import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeWithAutoExpandComponent } from './tree-with-auto-expand.component';

describe('TreeWithAutoExpandComponent', () => {
  let component: TreeWithAutoExpandComponent;
  let fixture: ComponentFixture<TreeWithAutoExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeWithAutoExpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeWithAutoExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

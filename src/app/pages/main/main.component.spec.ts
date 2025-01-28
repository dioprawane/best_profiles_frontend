import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MainComponent } from './main.component';
import { CanvasBoxComponent } from '../../components/canvas-box/canvas-box.component';
import { MatIconModule } from '@angular/material/icon';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent, CanvasBoxComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

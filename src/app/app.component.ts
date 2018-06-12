import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myDiv', { read: ElementRef })
  tref: ElementRef;
  title = 'APP';

  constructor() {}

  ngOnInit() {
    Scrollbar.init(this.tref.nativeElement, { damping: 0.2, thumbMinSize: 20 });
  }
}

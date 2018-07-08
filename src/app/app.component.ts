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
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  constructor() {}

  ngOnInit() {
    Scrollbar.init(this.tref.nativeElement, { damping: 0.2, thumbMinSize: 20 });
    this.myStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    this.myParams = {
      particles: {
        number: {
          value: 1000
        },
        color: {
          value: '#ffb87f'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.8
        },
        size: {
          value: 1,
          random: true,
          anim: {
            enable: false,
            speed: 80,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: false,
          distance: 0.1,
          opacity: 0.3
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false,
            mode: 'repulse'
          },
          onclick: {
            enable: false,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 800,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 800,
            size: 80,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          repulse: {
            distance: 400,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      }
    };
  }
}

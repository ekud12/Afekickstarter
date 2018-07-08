import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const moveAnimation = trigger('itemAnim', [
  transition(':enter', [style({ transform: 'translateY(-100%)', opacity: 0.5 }), animate('0.5s 0.5s')]),
  transition(':leave', [style({ transform: 'translateY(-100%)', opacity: 0.5 }), animate('0.5s 0.5s')])
]);

export const fadeAnimation = trigger('itemFade', [
  transition(':enter', [style({ opacity: 0 }), animate(500)]),
  transition(':leave', [style({ opacity: 0 }), animate(500)])
]);

export const staggerList = trigger('listAnimation', [
  transition('* => *', [
    query('.col', style({ opacity: 0.1, transform: 'translateY(-5%)' }), { optional: true }),
    animate('0.1s'),
    query('.col', stagger('100ms', [animate('0.1s', style({ opacity: 1, transform: 'translateY(0)' }))]), { optional: true })
  ])
]);

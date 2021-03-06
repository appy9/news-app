import {
  trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';


/**
 * Implement slide in animation for changes in route
 * between NewsComponent => NewsDetailComponent
 * and NewsDetailComponent => NewsComponent
 * as per the provided video
 */
// export const slideInAnimation = null;

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('NewsDetailComponent => NewsComponent', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('NewsComponent => NewsDetailComponent', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ right: '100%'}))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ right: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

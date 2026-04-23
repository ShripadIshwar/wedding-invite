import { Component } from '@angular/core';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeTransition', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'fixed',
            inset: 0,
            width: '100%'
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('400ms ease', style({
              opacity: 0,
              transform: 'translateY(-24px) scale(0.985)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateY(24px) scale(1.015)'
            }),
            animate('520ms cubic-bezier(0.2, 0.8, 0.2, 1)', style({
              opacity: 1,
              transform: 'translateY(0) scale(1)'
            }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'wedding-invite';

  constructor(public contexts: ChildrenOutletContexts) {}

  getRouteAnimationData(): string {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.animation || 'default';
  }
}

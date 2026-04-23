import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitation-entry',
  templateUrl: './invitation-entry.component.html',
  styleUrls: ['./invitation-entry.component.css']
})
export class InvitationEntryComponent {
  couple = {
    bride: 'Swati',
    groom: 'Shripad',
    familyLine: 'With the blessings of the Almighty and our beloved elders',
    dateLabel: 'Thursday, 14 May 2026'
  };

  opening = false;

  constructor(private router: Router) {}

  openInvitation(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.opening) {
      return;
    }

    this.opening = true;

    setTimeout(() => {
      this.router.navigateByUrl('/celebration');
    }, 950);
  }
}

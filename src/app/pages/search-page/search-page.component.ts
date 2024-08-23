import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  title = 'angular-test';
  profileService = inject(ProfileService)
  profiles: Profile[] = []
  constructor() {
    this.profileService.getTestApp().subscribe((val: Profile[]) => {
      this.profiles = val
    })
  }
  trackById(index: number, profile: Profile): number {
    return profile.id;
  }
}

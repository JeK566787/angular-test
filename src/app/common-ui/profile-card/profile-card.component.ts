import { Component, Input } from '@angular/core';
// import { Profile } from '../../../data/interfaces/profile.interface';
import { CommonModule } from '@angular/common';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}

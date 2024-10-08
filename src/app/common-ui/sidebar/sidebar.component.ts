import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    {
      label: "Моя страница",
      icon: 'home',
      link: ''
    },
    {
      label: "Чаты",
      icon: 'chat',
      link: 'chats'
    },
    {
      label: "Поиск",
      icon: 'search',
      link: 'search'
    }
  ]
}

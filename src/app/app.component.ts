import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslationService } from './services/translation.service';
import { filter } from 'rxjs';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    LanguageSelectorComponent,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Ticket Requests';
  showSidebar: boolean = true;
  drawerOpened: boolean = true;

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showSidebar = !event.url.includes('/login');
        this.drawerOpened = this.showSidebar;
      });
  }

  getRole(): string {
    return this.authService.getRole() || '';
  }

  getName(): string {
    return this.authService.getName();
  }

  isAuthenticated(): string {
    return this.authService.getToken();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust the path as necessary
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../services/translation.service';
import { throwIfEmpty } from 'rxjs';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    CommonModule,
    LanguageSelectorComponent,
    TranslatePipe
],
  providers: [HttpClient],
  standalone: true
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  translations: any = {};
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.translationService.translations$.subscribe((translations) => {
      this.translations = translations;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;

      this.authService.loginAndGetRole(user).subscribe({
        next: (response) => {
          this.authService.storeRole(response.role);
          this.authService.setName(response.name);
          if (response.role === 'client') {
            this.router.navigate(['/client']); 
          } else if (response.role === 'engineer') {
            this.router.navigate(['/engineer']); 
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage: string = 'en';
  private translations: any = {};
  private translationsSubject = new BehaviorSubject<any>({});
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private uri = environment.apiUrl + 'translations';

  constructor(private http: HttpClient, private cookieService: CookieService) {
    const savedLanguage = this.cookieService.get('language');
    this.currentLanguage = savedLanguage || this.currentLanguage;
    this.loadTranslations(this.currentLanguage);
  }

  private loadTranslations(lang: string): void {
    this.http.get(`${this.uri}/${lang}`).pipe(
      catchError(error => {
        // Log only critical errors, ignore non-critical ones
        if (error.status !== 0) {
          console.error('Error loading translations:', error);
        }
        return of({}); // Return an empty object on error
      })
    ).subscribe((data) => {
      this.translations = data;
      this.translationsSubject.next(this.translations);
    });
  }
  

  setLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.cookieService.set('language', lang);
    this.loadTranslations(lang);
  }

  get translations$() {
    return this.translationsSubject.asObservable();
  }

  get loading$() {
    return this.loadingSubject.asObservable(); // Expose loading state
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}

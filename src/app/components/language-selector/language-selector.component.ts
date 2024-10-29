import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  standalone: true
})
export class LanguageSelectorComponent {
  constructor(private translationService: TranslationService) {}

  onLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang);
  }
}

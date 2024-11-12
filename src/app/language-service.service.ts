import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {
  private currentLanguage:string='en'
  constructor() { }
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
  setCurrentLanguage(language: string): void {
    this.currentLanguage = language;
    console.log('this.currentLanguage: ', this.currentLanguage);
  }
}

import { Injectable } from '@angular/core';
import localization from '../translations/localization.json';
import localizationHR from '../translations/localization.hr-HR.json';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private localization: { key: string, value: string }[] = localization;
  private localizationHR: { key: string, value: string }[] = localizationHR;
  public lnagId: string = "hr-HR";


  constructor() { }

  translate(key: string) {
    var value: string;
    if (this.lnagId === "hr-HR") {
      value = this.localizationHR.filter(c => c.key === key)[0]?.value;
    }

    if (!value) {
      value = this.localization.filter(c => c.key === key)[0]?.value;
    }

    if (!value) {
      value = key;
    }

    return value;
  }
}

import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {
  static range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { 'range': true };
      }
      return null;
    };
  }
}

// How to use
// Import {NumberValidators} from 'path to this file';
// NumberValidators.range(min,max)

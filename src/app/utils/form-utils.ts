import { FormGroup, FormArray, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched
  }

  static getFieldError(form:FormGroup, fieldName: string): string | null {
    if( !form.controls[fieldName] ) return null;

    const errors = form.controls[fieldName].errors ?? {}

    return this.getTextErrors(errors);
  }

  static isValidFieldArray( formArray: FormArray, index: number ){
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    )
  }

  static getArrayFieldError( formArray: FormArray, index: number) {
    if( !formArray.controls[index] ) return null;

    const errors = formArray.controls[index].errors ?? {}

    return this.getTextErrors(errors);
  }

  static getTextErrors(errors: ValidationErrors): string | null {
    for(const key of Object.keys(errors)){
      switch(key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres`
        case 'min':
          return `Valor minimo de  ${errors['min'].min}`;
      }
    }

    return null;
  }
}

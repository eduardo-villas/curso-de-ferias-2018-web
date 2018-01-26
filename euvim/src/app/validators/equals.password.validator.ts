import {FormGroup} from '@angular/forms';

export class EqualsPasswordValidator {

  public static validate(firstField, secondField) {
    return (formGroup: FormGroup) => {       
    (formGroup.controls && formGroup.controls[firstField].value == formGroup.controls[secondField].value) 
        ? formGroup.controls[secondField].setErrors(formGroup.controls[secondField].getError('required') ? {required: {valid:false}} : null) :
        formGroup.controls[secondField].setErrors({passwordEquals: {valid: false}});
    }
  }

}
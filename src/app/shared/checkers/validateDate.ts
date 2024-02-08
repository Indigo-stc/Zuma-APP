import { FormControl, ValidationErrors } from "@angular/forms";

export function validateBirthDate(control: FormControl): ValidationErrors | null {
  const fechaNacimiento = new Date(control.value);
  const fechaActual = new Date();

  if (fechaNacimiento >= fechaActual) {
    return { birthDateGreater: true };
  }

  return null;
}
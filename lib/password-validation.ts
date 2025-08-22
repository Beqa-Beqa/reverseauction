export const passHas8Chars = (pass: string) => pass.trim().length >= 8;
export const passHasNumber = (pass: string) => /\d/.test(pass);
export const passHasCapital = (pass: string) => /[A-Z]/.test(pass);
export const passHasSymbol = (pass: string) =>
  /[(`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~)+]/.test(pass);

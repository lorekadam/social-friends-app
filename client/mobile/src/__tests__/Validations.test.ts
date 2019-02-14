import { emailValidation, nameValidation } from '../utils/validations';

describe('Validations', () => {
  it('Validates email', () => {
    expect(emailValidation('')).toBe(false);
    expect(emailValidation('12312454')).toBe(false);
    expect(emailValidation('test@@test.com')).toBe(false);
    expect(emailValidation('test@')).toBe(false);
    expect(emailValidation('test@test.com')).toBe(true);
    expect(emailValidation('t@t.cm')).toBe(true);
  });
  it('Validates name', () => {
    expect(nameValidation('')).toBe(false);
    expect(nameValidation('abc.')).toBe(false);
    expect(nameValidation('mySuperName!')).toBe(false);
    expect(nameValidation('abcdefabfthskisdd')).toBe(false);
    expect(nameValidation('my_super_name')).toBe(true);
    expect(nameValidation('name')).toBe(true);
  });
});

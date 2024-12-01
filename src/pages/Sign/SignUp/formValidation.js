import * as yup from 'yup';

export default yup.object().shape({
  fullname: yup
    .string()
    .min(4, 'O nome deve ter no mínimo 4 caracteres')
    .required('Preencha o campo Nome'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('Preencha o campo de e-mail'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Preencha o campo de senha'),
  passwordConfirmation: yup
    .string()
    .required('Preencha o campo de confirmação de senha')
    .test('passwords-match', 'Valores para senhas não conferem', function test(
      value,
    ) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .test(
      'is-true',
      'É necessário aceitar os termos e condições de uso para continuar',
      async (value) => value === true,
    ),
});

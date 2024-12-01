import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('Preencha o campo de e-mail')
    .label('Email'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Preencha o campo de senha')
    .label('Senha'),
});

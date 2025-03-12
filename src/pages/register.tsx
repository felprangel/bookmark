import { Header } from '@/components/Header'
import { RegisterData, useAuth } from '@/hooks/useAuth'
import { useFormik } from 'formik'
import Link from 'next/link'
import styled from 'styled-components'
import { z } from 'zod'

export default function Register() {
  const Auth = useAuth()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    onSubmit: handleSubmit
  })

  async function handleSubmit(data: RegisterData) {
    z.object({
      name: z.string().nonempty('O nome é obrigatório'),
      email: z.string().nonempty('O email é obrigatório'),
      password: z.string().nonempty('A senha é obrigatório'),
      password_confirmation: z.string().nonempty('A confirmação de senha é obrigatória')
    }).parse(data)

    Auth.register(data)
  }

  return (
    <>
      <Header title="Registro" />
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledInput
          type="text"
          name="name"
          placeholder="Nome"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <StyledInput
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <StyledInput
          type="password"
          name="password"
          placeholder="Senha"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <StyledInput
          type="password"
          name="password_confirmation"
          placeholder="Confirme sua Senha"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password_confirmation}
        />
        <Button>Pronto!</Button>
        <Link href={'/login'}>Já tem uma conta? Faça login</Link>
      </StyledForm>
    </>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em;
`

const StyledInput = styled.input`
  border: none;
  background-color: var(--white);
  padding: 1.3em;
  margin: 0.5em 0;
  border-radius: 0.4em;
  width: 23em;
  font-size: 1em;
  font-weight: 700;
  outline: none;
`

const Button = styled.button`
  margin: 0.5rem 0;
  border: 0;
  padding: 0.5em 1em;
  width: 100%;
  border-radius: 0.7em;
  font-size: 1.3em;
  font-weight: 600;
  outline: none;
  transition: 150ms linear;
  max-width: 30%;
  background-color: #d9d7da;

  &:hover {
    background-color: var(--gray);
  }
`

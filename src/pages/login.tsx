import { Header } from '@/components/Header'
import { LoginData, useAuth } from '@/hooks/useAuth'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { z } from 'zod'

export default function Login() {
  const Auth = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: handleSubmit
  })

  async function handleSubmit(data: LoginData) {
    z.object({
      email: z.string().nonempty('O email é obrigatório'),
      password: z.string().nonempty('A senha é obrigatória')
    }).parse(data)

    Auth.login(data)
  }

  return (
    <>
      <Header title="Login" />
      <StyledForm onSubmit={formik.handleSubmit}>
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
        <Button>Pronto!</Button>
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
  margin-top: 0.5rem;
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

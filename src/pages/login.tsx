import { Header } from '@/components/Header'
import { LoginData, useAuth } from '@/hooks/useAuth'
import { useFormik } from 'formik'
import Link from 'next/link'
import styled from 'styled-components'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export default function Login() {
  const Auth = useAuth()

  const loginSchema = z.object({
    email: z.string({ required_error: 'O email é obrigatório' }).email('Email inválido'),
    password: z.string({ required_error: 'A senha é obrigatória' })
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: handleSubmit,
    validateOnBlur: true
  })

  async function handleSubmit(data: LoginData) {
    Auth.login(data)
  }

  return (
    <>
      <Header title="Login" />
      <AuthLayout>
        <StyledForm onSubmit={formik.handleSubmit}>
          <FormHeader>
            <Title>Bem-vindo de volta</Title>
            <Subtitle>Acesse sua estante editorial.</Subtitle>
          </FormHeader>
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <StyledInput
              id="email"
              type="email"
              name="email"
              placeholder="nome@exemplo.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && <ErrorMessage>{formik.errors.email}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <Label htmlFor="password">Senha</Label>
            <StyledInput
              id="password"
              type="password"
              name="password"
              placeholder="Sua senha"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && <ErrorMessage>{formik.errors.password}</ErrorMessage>}
          </InputContainer>

          <Button type="submit">Entrar</Button>
          <FooterLink>
            <Link href={'/register'}>Não tem uma conta? Registre-se</Link>
          </FooterLink>
        </StyledForm>
      </AuthLayout>
    </>
  )
}

const AuthLayout = styled.main`
  min-height: calc(100vh - 5rem);
  display: flex;
  justify-content: center;
  padding: 2.5rem 1.5rem 4rem;
`

const StyledForm = styled.form`
  width: min(440px, 100%);
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.4rem;
`

const Title = styled.h1`
  font-size: 2.1rem;
  color: var(--ink);
`

const Subtitle = styled.p`
  color: var(--muted-ink);
  font-size: 1rem;
`

const Label = styled.label`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted-ink);
`

const StyledInput = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 0.7rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
`

const ErrorMessage = styled.span`
  color: #ff3333;
  font-size: 0.8em;
  margin-top: 0.3em;
  align-self: flex-start;
`

const Button = styled.button`
  border: 1px solid var(--accent);
  padding: 0.75rem 1rem;
  width: 100%;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  outline: none;
  transition: 150ms ease;
  background-color: var(--accent);
  color: var(--white);

  &:hover {
    background-color: var(--accent-strong);
  }
`

const FooterLink = styled.div`
  text-align: center;
  font-size: 0.95rem;
  color: var(--muted-ink);
`

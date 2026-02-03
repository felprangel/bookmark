import { Header } from '@/components/Header'
import { RegisterData, useAuth } from '@/hooks/useAuth'
import { useFormik } from 'formik'
import Link from 'next/link'
import styled from 'styled-components'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export default function Register() {
  const Auth = useAuth()

  const registerSchema = z.object({
    name: z.string({ required_error: 'O nome é obrigatório' }),
    email: z.string({ required_error: 'O email é obrigatório' }).email('Email inválido'),
    password: z.string({ required_error: 'A senha é obrigatória' }),
    password_confirmation: z.string({ required_error: 'A confirmação de senha é obrigatória' })
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: handleSubmit,
    validateOnBlur: true
  })

  async function handleSubmit(data: RegisterData) {
    Auth.register(data)
  }

  return (
    <>
      <Header title="Registro" />
      <AuthLayout>
        <StyledForm onSubmit={formik.handleSubmit}>
          <FormHeader>
            <Title>Crie sua conta</Title>
            <Subtitle>Monte sua biblioteca com elegância.</Subtitle>
          </FormHeader>
          <InputContainer>
            <Label htmlFor="name">Nome</Label>
            <StyledInput
              id="name"
              type="text"
              name="name"
              placeholder="Seu nome completo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && <ErrorMessage>{formik.errors.name}</ErrorMessage>}
          </InputContainer>
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
              placeholder="Crie uma senha"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && <ErrorMessage>{formik.errors.password}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password_confirmation">Confirme a senha</Label>
            <StyledInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              placeholder="Repita sua senha"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password_confirmation}
            />
            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
              <ErrorMessage>{formik.errors.password_confirmation}</ErrorMessage>
            )}
          </InputContainer>
          <Button type="submit">Criar conta</Button>
          <FooterLink>
            <Link href={'/login'}>Já tem uma conta? Faça login</Link>
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
  width: min(480px, 100%);
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

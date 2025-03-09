import { Header } from '@/components/Header'
import { api } from '@/services/api'
import { useFormik } from 'formik'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import styled from 'styled-components'

interface FormData {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

export default function Login() {
  const Router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: handleSubmit
  })

  async function handleSubmit(data: FormData) {
    const response = await api.post<LoginResponse>('/login', data)
    const token = response.data.token.split('|')[1]
    Cookie.set('token', token)
    Router.replace('/')
  }
  return (
    <>
      <Header title="Login" />
      <StyledForm onSubmit={formik.handleSubmit}>
        <h1>Adicionar Livro</h1>
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
  background-color: #f0eef1;
  padding: 1.3em;
  margin: 0.5em 0;
  border-radius: 0.4em;
  width: 23em;
  font-size: 1em;
  font-weight: 700;
  outline: none;
`

const Button = styled.button`
  border: 0;
  padding: 0.5em 1em;
  width: 100%;
  border-radius: 0.7em;
  font-size: 1.3em;
  font-weight: 600;
  outline: none;
  transition: 150ms linear;

  &:hover {
    background-color: #d9d7da;
  }
`

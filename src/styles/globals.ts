import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --white: #fffdf9;
    --paper: #f7f4ef;
    --ink: #2b2724;
    --muted-ink: #6f6862;
    --border: #e3ddd6;
    --accent: #6c7a6f;
    --accent-strong: #566257;
    --shadow-soft: 0 18px 36px rgba(22, 18, 14, 0.08);
    --shadow-tight: 0 8px 20px rgba(22, 18, 14, 0.1);
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;
    --font-serif: 'Cormorant Garamond', 'Times New Roman', serif;
    --font-sans: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-sans);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    min-height: 100vh;
    color: var(--ink);
    background: radial-gradient(circle at top left, #fcfaf6 0%, #f5f0e8 55%, #f1ece4 100%);
  }

  h1,
  h2,
  h3 {
    font-family: var(--font-serif);
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  p,
  span,
  li,
  label {
    color: var(--muted-ink);
  }

  input,
  textarea,
  button {
    font: 400 1rem var(--font-sans);
  }

  button {
    cursor: pointer;
    border-radius: 0.4rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 150ms ease, color 150ms ease;
  }

  a:hover {
    color: var(--ink);
    border-bottom-color: var(--accent);
  }

  input,
  textarea {
    color: var(--ink);
    background-color: var(--white);
    border: 1px solid var(--border);
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }

  input:focus,
  textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(108, 122, 111, 0.2);
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
`

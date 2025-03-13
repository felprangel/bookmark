import { BookCard } from '@/components/BookCard'
import { BookModal, BookProps } from '@/components/BookModal'
import { Header } from '@/components/Header'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Index() {
  useEffect(() => {
    async function syncBooks() {
      const books = await api.get<BookProps[]>('/books')
      setBooks(books.data)
    }

    window.addEventListener('storage', syncBooks)
    syncBooks()

    return () => {
      window.removeEventListener('storage', syncBooks)
    }
  }, [])

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [books, setBooks] = useState<BookProps[]>([])

  async function handleRead(id: number, read: boolean) {
    await api.patch(`/books/${id}/read`, { read: !read })
    window.dispatchEvent(new Event('storage'))
  }

  async function removeBook(id: number) {
    await api.delete(`/books/${id}`)
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <>
      <Header />
      <ButtonContainer>
        <Button onClick={() => setModalOpen(true)}>+ Adicionar Livro</Button>
      </ButtonContainer>
      <CardsContainer>
        {books.map(book => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            pages={book.pages}
            read={book.read}
            handleRead={() => handleRead(book.id, book.read)}
            removeBook={() => removeBook(book.id)}
          />
        ))}
      </CardsContainer>
      <BookModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  border: 0;
  margin: 1.5em 0;
  font-size: 1.4em;
  font-weight: 600;
  padding: 0.7em 1em;
  border-radius: 0.7em;
  transition: 150ms linear;
  outline: none;

  &:hover {
    background-color: var(--dark-gray);
  }
`

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  padding: 0em 1em 2em 1em;
  gap: 40px;
`

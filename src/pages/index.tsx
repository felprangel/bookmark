import { BookCard } from '@/components/BookCard'
import { BookModal, BookProps } from '@/components/BookModal'
import { Header } from '@/components/Header'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Index() {
  useEffect(() => {
    function syncBooks() {
      const books = localStorage.getItem('books')
      setBooks(books ? JSON.parse(books) : [])
    }
    window.addEventListener('storage', syncBooks)
    syncBooks()

    return () => {
      window.removeEventListener('storage', syncBooks)
    }
  }, [])

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [books, setBooks] = useState<BookProps[]>([])

  function handleRead(index: number) {
    const updatedBooks = [...books]
    updatedBooks[index].read = !updatedBooks[index].read
    setBooks(updatedBooks)
    localStorage.setItem('books', JSON.stringify(updatedBooks))
  }

  function removeBook(index: number) {
    const updatedBooks = [...books]
    updatedBooks.splice(index, 1)
    setBooks(updatedBooks)
    localStorage.setItem('books', JSON.stringify(updatedBooks))
  }

  return (
    <>
      <Header />
      <ButtonContainer>
        <Button onClick={() => setModalOpen(true)}>+ Adicionar Livro</Button>
      </ButtonContainer>
      <CardsContainer>
        {books.map((book, index) => (
          <BookCard
            key={`${book.title}_${book.pages}`}
            title={book.title}
            author={book.author}
            pages={book.pages}
            read={book.read}
            handleRead={() => handleRead(index)}
            removeBook={() => removeBook(index)}
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

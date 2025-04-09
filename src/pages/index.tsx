import { BookCard } from '@/components/BookCard'
import { BookModal, BookProps } from '@/components/BookModal'
import { Header } from '@/components/Header'
import { api } from '@/services/api'
import { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface BookPage {
  books: BookProps[]
  nextPage: number | undefined
}

interface InfiniteQueryData {
  pages: BookPage[]
  pageParams: (number | undefined)[]
}

const ITEMS_PER_PAGE = 10

export default function Index() {
  const queryClient = useQueryClient()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['books'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<BookProps[]>('/books', {
        params: {
          page: pageParam
        }
      })

      return {
        books: response.data,
        nextPage: response.data.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined
      }
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage
  })

  const handleRead = useMutation({
    mutationFn: ({ id, read }: { id: number; read: boolean }) => {
      return api.patch(`/books/${id}/read`, { read: !read })
    },
    onMutate: async ({ id, read }) => {
      await queryClient.cancelQueries({ queryKey: ['books'] })

      const previousData = queryClient.getQueryData<InfiniteQueryData>(['books'])

      queryClient.setQueryData<InfiniteQueryData>(['books'], oldData => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map(page => {
            return {
              ...page,
              books: page.books.map(book => (book.id === id ? { ...book, read: !read } : book))
            }
          })
        }
      })

      return { previousData }
    },
    onError: (error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<InfiniteQueryData>(['books'], context.previousData)
      }
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    },
    onSuccess: (_data, variables) => {
      toast.success(!variables.read ? 'Marked as read!' : 'Marked as unread.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    }
  })

  const deleteBooks = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return api.delete(`/books/${id}`)
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['books'] })

      const previousData = queryClient.getQueryData<InfiniteQueryData>(['books'])

      queryClient.setQueryData<InfiniteQueryData>(['books'], oldData => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map(page => {
            return {
              ...page,
              books: page.books.filter(book => book.id !== id)
            }
          })
        }
      })

      return { previousData }
    },
    onError: (error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<InfiniteQueryData>(['books'], context.previousData)
      }
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    },
    onSuccess: () => {
      toast.success('Book deleted!')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    }
  })

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    const element = loadMoreRef.current

    if (element) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      })

      observerRef.current.observe(element)
    }

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element)
      }
    }
  }, [handleObserver])

  const books = data?.pages.flatMap(page => page.books) || []

  return (
    <>
      <Header showRightSide />
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
            handleRead={() => handleRead.mutate({ id: book.id, read: book.read })}
            removeBook={() => deleteBooks.mutate({ id: book.id })}
          />
        ))}
        <LoadingIndicator ref={loadMoreRef}>{isFetchingNextPage && 'Carregando mais livros...'}</LoadingIndicator>
      </CardsContainer>
      <BookModal
        open={modalOpen}
        onClose={() => {
          refetch()
          setModalOpen(false)
        }}
      />
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

const LoadingIndicator = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 1em;
  font-size: 1.2em;
  color: var(--dark-gray);
`

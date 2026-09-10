import { useState, type FormEvent } from 'react';
import { Head, router } from '@inertiajs/react';
import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import { PostList } from '../components/PostList';
import { Pagination } from '../components/Pagination';

interface SearchProps {
  query: string;
  posts: WPPost[];
  meta: { totalItems: number; totalPages: number };
  page: number;
}

const Header = styled.div`
  margin-bottom: 1.75rem;
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  margin-bottom: 0.4rem;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 1.25rem;
`;

const Form = styled.form`
  display: flex;
  gap: 0.6rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.95rem;
  background: ${({ theme }) => theme.colors.surface};

  &:focus {
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.goldDark};
  }
`;

const ResultsLabel = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 1.75rem 0 1.25rem;
`;

const EmptyState = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 2rem 0;
`;

/**
 * Ported from the Vite SPA's src/pages/Search.tsx. The search itself now
 * runs server-side (SearchController), and the query/page state that used
 * to live in the URL via useSearchParams is now just... the URL, driven by
 * real Inertia navigations (router.get) instead of client-side history state.
 */
export function Search({ query, posts, meta, page }: SearchProps) {
  const [inputValue, setInputValue] = useState(query);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.get('/search', { q: inputValue });
  }

  function handlePageChange(newPage: number) {
    router.get('/search', { q: query, page: newPage }, { preserveScroll: true });
  }

  return (
    <>
      <Head>
        <title>{`${query ? `Search: ${query}` : 'Search'} | GhanaTalksRadio`}</title>
      </Head>

      <Header>
        <Eyebrow>Find a story</Eyebrow>
        <Title>Search GhanaTalksRadio</Title>
        <Form onSubmit={handleSubmit} role="search">
          <Input
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search stories…"
            aria-label="Search stories"
          />
          <SubmitButton type="submit">Search</SubmitButton>
        </Form>
      </Header>

      {query ? (
        <>
          <ResultsLabel>
            {`${meta.totalItems} result${meta.totalItems === 1 ? '' : 's'} for `}
            <strong>"{query}"</strong>
          </ResultsLabel>
          <PostList posts={posts} isLoading={false} isError={false} />
          <Pagination page={page} totalPages={meta.totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <EmptyState>Enter a search term to find stories.</EmptyState>
      )}
    </>
  );
}

export default Search;

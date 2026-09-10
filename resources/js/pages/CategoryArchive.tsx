import { Head, router } from '@inertiajs/react';
import styled from 'styled-components';
import type { WPCategory, WPPost } from '../types/wordpress';
import { PostList } from '../components/PostList';
import { Pagination } from '../components/Pagination';

interface CategoryArchiveProps {
  category: WPCategory | null;
  posts: WPPost[];
  meta: { totalItems: number; totalPages: number };
  page: number;
}

const Header = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};
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
  font-size: clamp(1.6rem, 4vw, 2.1rem);
`;

const StateBox = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 3rem 1.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radius.md};
`;

/**
 * Ported from the Vite SPA's src/pages/CategoryArchive.tsx. Pagination and
 * the category lookup both now happen server-side (CategoryArchiveController)
 * instead of client-side react-query hooks - page changes are real Inertia
 * navigations (router.get), each one a fresh server-rendered response.
 */
export function CategoryArchive({ category, posts, meta, page }: CategoryArchiveProps) {
  function handlePageChange(newPage: number) {
    router.get(
      `/category/${category!.slug}`,
      { page: newPage },
      { preserveScroll: true }
    );
  }

  if (!category) {
    return (
      <>
        <Head>
          <title>Section not found | GhanaTalksRadio</title>
        </Head>
        <Header>
          <Title>Section not found</Title>
        </Header>
        <StateBox>This category doesn't exist or may have been renamed.</StateBox>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${category.name} | GhanaTalksRadio`}</title>
        <meta
          name="description"
          content={category.description || `Latest ${category.name} stories from GhanaTalksRadio.`}
        />
      </Head>

      <Header>
        <Eyebrow>Section</Eyebrow>
        <Title>{category.name}</Title>
      </Header>

      <PostList posts={posts} isLoading={false} isError={false} />

      <Pagination page={page} totalPages={meta.totalPages} onPageChange={handlePageChange} />
    </>
  );
}

export default CategoryArchive;

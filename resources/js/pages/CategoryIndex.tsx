import { Head } from '@inertiajs/react';
import styled from 'styled-components';
import { Link } from '../routing/Link';
import type { WPCategory } from '../types/wordpress';

interface CategoryIndexProps {
  categories: WPCategory[];
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
`;

const CategoryCard = styled(Link)`
  display: block;
  padding: 1.25rem 1.4rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
    text-decoration: none;
  }
`;

const CategoryName = styled.h2`
  font-size: 1.05rem;
  margin: 0 0 0.35rem;
`;

const CategoryDescription = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CategoryCount = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const StateBox = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 3rem 1.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radius.md};
`;

/**
 * A real, standalone directory of every category - see
 * CategoryIndexController's own docblock for why this exists (a
 * crawlable, sitemap-listed /category page, distinct from
 * /category/{slug}'s own article listing).
 */
export function CategoryIndex({ categories }: CategoryIndexProps) {
  return (
    <>
      <Head>
        <title>Categories | GhanaTalksRadio</title>
        <meta
          name="description"
          content="Browse every news and content category on GhanaTalksRadio - politics, entertainment, sports, lifestyle and more."
        />
      </Head>

      <Header>
        <Eyebrow>Browse</Eyebrow>
        <Title>Categories</Title>
      </Header>

      {categories.length === 0 ? (
        <StateBox>No categories to show right now.</StateBox>
      ) : (
        <Grid>
          {categories.map((category) => (
            <CategoryCard key={category.id} to={`/category/${category.slug}`}>
              <CategoryName>{category.name}</CategoryName>
              {category.description && (
                <CategoryDescription>{category.description}</CategoryDescription>
              )}
              <CategoryCount>{category.count} {category.count === 1 ? 'article' : 'articles'}</CategoryCount>
            </CategoryCard>
          ))}
        </Grid>
      )}
    </>
  );
}

export default CategoryIndex;

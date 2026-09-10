import styled from 'styled-components';
import { PostContent } from '../components/PostContent';

interface StaticPageProps {
  title: string;
  content: string | null;
}

const Article = styled.article`
  max-width: ${({ theme }) => theme.contentWidth};
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 2rem clamp(1.25rem, 4vw, 3rem) 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 1.5rem;
`;

function StaticPage({ title, content }: StaticPageProps) {
  if (content === null) {
    return (
      <Article>
        <Title>Not found</Title>
        <p>This page couldn't be found.</p>
      </Article>
    );
  }

  return (
    <Article>
      <Title>{title}</Title>
      <PostContent html={content} />
    </Article>
  );
}

export default StaticPage;

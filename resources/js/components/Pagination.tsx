import styled from 'styled-components';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2.5rem;
`;

const PageButton = styled.button`
  padding: 0.55rem 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.goldTint};
  }
`;

const PageIndicator = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 0 0.4rem;
`;

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Nav aria-label="Pagination">
      <PageButton onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        ← Prev
      </PageButton>
      <PageIndicator aria-current="page">
        {page} / {totalPages}
      </PageIndicator>
      <PageButton onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
        Next →
      </PageButton>
    </Nav>
  );
}

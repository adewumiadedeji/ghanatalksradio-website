import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { Link } from '../routing/Link';

interface AccountDeletionProps {
  portalApiUrl: string;
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
  margin: 0 0 1rem;
`;

const Body = styled.p`
  font-size: 1.02rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1rem;
`;

const List = styled.ul`
  font-size: 1.02rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 2rem;
  padding-left: 1.25rem;
`;

const Form = styled.form`
  max-width: 26rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 0.35rem;
  padding: 0.65rem 0.85rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.ink};
`;

const ConfirmLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  background: #b3261e;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const Message = styled.p<{ $isError: boolean }>`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ $isError }) => ($isError ? '#b3261e' : '#1b6b4a')};
`;

function AccountDeletion({ portalApiUrl }: AccountDeletionProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!confirmed || submitting) return;

    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch(`${portalApiUrl}/api/auth/delete-account`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (json.status) {
        setResult({ success: true, message: json.message || 'Your account has been deleted.' });
        setEmail('');
        setPassword('');
        setConfirmed(false);
      } else {
        setResult({ success: false, message: json.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setResult({ success: false, message: 'Network error - please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Article>
      <Title>Delete Your Account</Title>
      <Body>
        Deleting your GhanaTalksRadio account is permanent and cannot be undone. This immediately removes:
      </Body>
      <List>
        <li>Your account and login credentials</li>
        <li>Your listening history and points/leaderboard standing</li>
        <li>Any saved preferences tied to your account</li>
      </List>
      <Body>
        Confirm your email and password below to delete your account right now. If you'd rather have our
        support team handle it, <Link to="/contact-us">contact us</Link> instead.
      </Body>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ConfirmLabel>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I understand this is permanent and cannot be undone.
        </ConfirmLabel>
        <SubmitButton type="submit" disabled={!confirmed || submitting}>
          {submitting ? 'Deleting…' : 'Delete my account'}
        </SubmitButton>
        {result && <Message $isError={!result.success}>{result.message}</Message>}
      </Form>
    </Article>
  );
}

export default AccountDeletion;

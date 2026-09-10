import styled from 'styled-components';

interface ContactUsProps {
  supportEmail: string;
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
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1.5rem;
`;

const EmailLink = styled.a`
  display: inline-block;
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gold ?? theme.colors.ink};
`;

function ContactUs({ supportEmail }: ContactUsProps) {
  return (
    <Article>
      <Title>Contact Us</Title>
      <Body>Have a question, feedback, or need help with your account? Reach out and we'll get back to you.</Body>
      <EmailLink href={`mailto:${supportEmail}`}>{supportEmail}</EmailLink>
    </Article>
  );
}

export default ContactUs;

import styled from 'styled-components';

interface CorrectionsPolicyProps {
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

const SubTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.ink};
`;

const Section = styled.section`
  width: 100%;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Body = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const List = styled.ol`
  margin: 0 0 1.5rem;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const UnorderedList = styled.ul`
  margin: 0 0 1.5rem;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const ListItem = styled.li`
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 0.65rem;
`;

const Strong = styled.strong`
  color: ${({ theme }) => theme.colors.ink};
`;

const ContactBox = styled.div`
  padding: 1.25rem;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border ?? '#e5e5e5'};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background ?? '#fafafa'};
`;

const ContactItem = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 0.65rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EmailLink = styled.a`
  color: ${({ theme }) => theme.colors.gold ?? theme.colors.ink};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function CorrectionsPolicy({ supportEmail }: CorrectionsPolicyProps) {
  return (
    <Article>
      <Title>Corrections Policy</Title>

      <Section>
        <SubTitle>Our Commitment to Accuracy</SubTitle>

        <Body>
          GhanaTalksRadio is committed to providing accurate, responsible and
          trustworthy information to its audience.
        </Body>

        <Body>
          Journalism is a human process and, despite reasonable efforts to
          verify information, errors can occasionally occur. When we identify a
          material factual error, we seek to correct the published record
          promptly and transparently.
        </Body>

        <Body>
          Our corrections policy explains how GhanaTalksRadio handles factual
          errors, corrections, clarifications and complaints relating to
          published editorial content.
        </Body>
      </Section>

      <Section>
        <SubTitle>What We Correct</SubTitle>

        <Body>
          We may correct errors that materially affect the accuracy or
          understanding of published content.
        </Body>

        <UnorderedList>
          <ListItem>Incorrect names or identities</ListItem>
          <ListItem>Incorrect dates or locations</ListItem>
          <ListItem>Incorrect figures or statistics</ListItem>
          <ListItem>Incorrect quotations</ListItem>
          <ListItem>Incorrect descriptions of events</ListItem>
          <ListItem>Incorrect attribution of information</ListItem>
          <ListItem>Material factual errors</ListItem>
          <ListItem>Misleading factual statements</ListItem>
        </UnorderedList>

        <Body>
          Minor spelling, punctuation, formatting or grammatical errors that do
          not materially change the meaning of an article may be corrected
          without a formal correction notice.
        </Body>
      </Section>

      <Section>
        <SubTitle>Corrections vs. Clarifications</SubTitle>

        <Body>
          A <Strong>correction</Strong> is appropriate when published
          information contains a material factual error.
        </Body>

        <Body>
          A <Strong>clarification</Strong> may be used where the information is
          substantially accurate but could reasonably be misunderstood because
          of wording, context or presentation.
        </Body>

        <Body>
          In either case, our objective is to ensure that the published
          information accurately communicates the available facts.
        </Body>
      </Section>

      <Section>
        <SubTitle>How to Request a Correction</SubTitle>

        <Body>
          Anyone who identifies a potential factual error in content published
          by GhanaTalksRadio may contact our editorial team.
        </Body>

        <Body>
          To help us investigate a correction request efficiently, please
          provide:
        </Body>

        <UnorderedList>
          <ListItem>
            The title or headline of the article or programme concerned.
          </ListItem>

          <ListItem>
            The URL of the published article where available.
          </ListItem>

          <ListItem>
            A clear description of the alleged error.
          </ListItem>

          <ListItem>
            The specific information that you believe is incorrect.
          </ListItem>

          <ListItem>
            The correct information and supporting evidence where available.
          </ListItem>

          <ListItem>
            Your contact information in case additional clarification is
            required.
          </ListItem>
        </UnorderedList>
      </Section>

      <Section>
        <SubTitle>How We Review Correction Requests</SubTitle>

        <Body>
          Correction requests are reviewed based on the available evidence and
          the editorial circumstances surrounding the publication.
        </Body>

        <List>
          <ListItem>
            We identify the specific claim or information alleged to be
            incorrect.
          </ListItem>

          <ListItem>
            We review the original publication and the available source
            material.
          </ListItem>

          <ListItem>
            Where appropriate, we seek additional information or clarification
            from relevant sources.
          </ListItem>

          <ListItem>
            We determine whether the issue represents a factual error,
            clarification issue, editorial disagreement or another matter.
          </ListItem>

          <ListItem>
            Where a material error is confirmed, we make an appropriate
            correction to the published content.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>Evidence and Supporting Information</SubTitle>

        <Body>
          Correction requests should, where possible, be supported by reliable
          evidence.
        </Body>

        <Body>
          Depending on the subject matter, useful evidence may include official
          documents, statements from relevant authorities, verified records,
          direct documentation or other credible sources.
        </Body>

        <Body>
          A disagreement with the opinion, tone or editorial judgment of an
          article does not necessarily constitute a factual error.
        </Body>
      </Section>

      <Section>
        <SubTitle>When a Correction Is Made</SubTitle>

        <Body>
          When a material factual error is confirmed, GhanaTalksRadio may
          correct the relevant portion of the article while preserving the
          integrity and context of the original report.
        </Body>

        <Body>
          Where appropriate, a correction notice may be added to the article to
          explain what was corrected.
        </Body>

        <Body>
          The nature of the correction will depend on the significance of the
          error and the circumstances in which it occurred.
        </Body>
      </Section>

      <Section>
        <SubTitle>Significant Errors</SubTitle>

        <Body>
          Particularly significant errors may require more prominent
          correction or clarification.
        </Body>

        <Body>
          Examples may include errors that materially change the meaning of a
          story, incorrectly identify a person, incorrectly attribute serious
          allegations, significantly misstate financial or statistical
          information, or materially misrepresent an event.
        </Body>
      </Section>

      <Section>
        <SubTitle>Headlines and Social Media</SubTitle>

        <Body>
          Corrections may also be necessary where an error appears in a
          headline, caption, image description, social-media post or other
          distribution format.
        </Body>

        <Body>
          Where a material error has been distributed through our digital
          channels, we may update the relevant content or distribution
          material to reflect the correction.
        </Body>
      </Section>

      <Section>
        <SubTitle>Archived and Previously Published Content</SubTitle>

        <Body>
          Older articles may remain accessible as part of the historical
          record. Where a material factual error is identified in previously
          published content, we may update the article and provide an
          appropriate correction or clarification.
        </Body>
      </Section>

      <Section>
        <SubTitle>What Is Not Normally a Correction</SubTitle>

        <Body>
          Not every complaint about published content represents a factual
          error.
        </Body>

        <UnorderedList>
          <ListItem>
            Disagreement with an editorial opinion is not necessarily a factual
            error.
          </ListItem>

          <ListItem>
            Disagreement with the prominence or placement of a story is not
            necessarily a factual error.
          </ListItem>

          <ListItem>
            Disagreement with a political or social position expressed by a
            quoted source is not necessarily a factual error.
          </ListItem>

          <ListItem>
            Requests to remove accurate information solely because it is
            inconvenient may not qualify as correction requests.
          </ListItem>
        </UnorderedList>
      </Section>

      <Section>
        <SubTitle>Right of Reply</SubTitle>

        <Body>
          Where a published report contains significant allegations or claims
          concerning an individual or organization, GhanaTalksRadio may provide
          an appropriate opportunity for a response where editorially
          justified.
        </Body>

        <Body>
          A response or right of reply does not necessarily mean that the
          original report was factually incorrect.
        </Body>
      </Section>

      <Section>
        <SubTitle>Our Editorial Responsibility</SubTitle>

        <Body>
          GhanaTalksRadio takes responsibility for the accuracy and integrity
          of content published through its editorial platforms.
        </Body>

        <Body>
          We encourage readers, listeners and members of the public to bring
          potential errors to our attention. Constructive feedback helps us
          improve the quality and reliability of our journalism.
        </Body>
      </Section>

      <Section>
        <SubTitle>Contact Us About a Correction</SubTitle>

        <Body>
          To report a potential factual error or request a correction, please
          contact the GhanaTalksRadio editorial team.
        </Body>

        <ContactBox>
          <ContactItem>
            <Strong>Email:</Strong>{' '}
            <EmailLink href={`mailto:${supportEmail}`}>
              {supportEmail}
            </EmailLink>
          </ContactItem>

          <ContactItem>
            Please include the article title, URL, specific error and any
            supporting evidence available.
          </ContactItem>
        </ContactBox>
      </Section>
    </Article>
  );
}

export default CorrectionsPolicy;

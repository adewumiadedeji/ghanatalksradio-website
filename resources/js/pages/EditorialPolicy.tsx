import styled from 'styled-components';

interface EditorialPolicyProps {
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

const List = styled.ul`
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

function EditorialPolicy({ supportEmail }: EditorialPolicyProps) {
  return (
    <Article>
      <Title>Editorial Policy</Title>

      <Section>
        <SubTitle>Our Editorial Standards</SubTitle>

        <Body>
          GhanaTalksRadio is committed to responsible journalism and the
          publication of accurate, fair, relevant and trustworthy information.
          Our editorial policy establishes the principles that guide our news
          reporting, digital publishing, interviews, broadcasts and other
          editorial activities.
        </Body>

        <Body>
          Our editorial work is guided by the principles of{' '}
          <Strong>accuracy, fairness, independence, accountability,
          transparency and public interest.</Strong>
        </Body>
      </Section>

      <Section>
        <SubTitle>Our Editorial Mission</SubTitle>

        <Body>
          GhanaTalksRadio exists to inform, engage, entertain and give people a
          platform to be heard.
        </Body>

        <Body>
          We seek to provide audiences with reliable information while creating
          space for meaningful conversations about Ghana, Africa and the wider
          world.
        </Body>

        <Body>
          Our editorial decisions are intended to serve our audience and the
          public interest rather than political, commercial or personal
          interests.
        </Body>
      </Section>

      <Section>
        <SubTitle>Accuracy and Verification</SubTitle>

        <Body>
          Accuracy is fundamental to our journalism. We seek to verify
          information before publication and take reasonable steps to establish
          the reliability of significant claims.
        </Body>

        <List>
          <ListItem>
            We seek to use credible and identifiable sources whenever possible.
          </ListItem>

          <ListItem>
            Important claims should be checked against available evidence or
            reliable sources before publication.
          </ListItem>

          <ListItem>
            Information obtained from social media should not automatically be
            treated as verified information.
          </ListItem>

          <ListItem>
            Anonymous or unnamed sources may be used when there is a legitimate
            editorial reason to protect the source's identity.
          </ListItem>

          <ListItem>
            Where information cannot be independently verified, the published
            report should make that limitation clear where appropriate.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>Fairness and Balance</SubTitle>

        <Body>
          GhanaTalksRadio seeks to report matters fairly and without
          deliberately misleading its audience.
        </Body>

        <Body>
          Where a story involves significant competing claims, disputes or
          allegations, we seek to provide relevant perspectives and give
          affected parties a reasonable opportunity to respond where
          appropriate.
        </Body>

        <Body>
          Allegations should not be presented as established facts. Editorial
          language should distinguish between what is confirmed, what is
          alleged and what remains uncertain.
        </Body>
      </Section>

      <Section>
        <SubTitle>Sources and Attribution</SubTitle>

        <Body>
          GhanaTalksRadio recognizes the importance of identifying the origin
          of information.
        </Body>

        <List>
          <ListItem>
            Information from official institutions should be appropriately
            attributed.
          </ListItem>

          <ListItem>
            Statements and opinions should be attributed to the individuals or
            organizations expressing them.
          </ListItem>

          <ListItem>
            Information obtained from other media organizations should be
            appropriately credited where applicable.
          </ListItem>

          <ListItem>
            User-generated content and social-media material should be
            identified appropriately when used in editorial reporting.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>Editorial Independence</SubTitle>

        <Body>
          GhanaTalksRadio maintains a separation between editorial decision
          making and commercial interests.
        </Body>

        <Body>
          Advertising, sponsorship, partnerships or other commercial
          relationships should not determine the factual conclusions,
          editorial positions or newsworthiness of a story.
        </Body>

        <Body>
          Editorial staff and contributors are expected to exercise
          independent judgment when determining what information should be
          published.
        </Body>
      </Section>

      <Section>
        <SubTitle>Public Interest</SubTitle>

        <Body>
          Public interest is an important consideration in determining what we
          report and how we report it.
        </Body>

        <Body>
          Public-interest journalism may include reporting on government,
          governance, public spending, elections, crime, public safety,
          business, health, education, corruption, environmental matters and
          other issues that materially affect communities.
        </Body>

        <Body>
          Public interest should, however, be distinguished from simple public
          curiosity. Personal information should not be published merely
          because it may attract attention.
        </Body>
      </Section>

      <Section>
        <SubTitle>Privacy and Personal Information</SubTitle>

        <Body>
          GhanaTalksRadio respects individual privacy and seeks to avoid the
          unnecessary publication of private or sensitive personal information.
        </Body>

        <Body>
          Information concerning private individuals should only be published
          where there is a legitimate editorial or public-interest reason.
        </Body>

        <Body>
          Particular care should be exercised when reporting on children,
          victims of crime, vulnerable individuals and people who may be at
          heightened risk from the disclosure of personal information.
        </Body>
      </Section>

      <Section>
        <SubTitle>Reporting Allegations and Crime</SubTitle>

        <Body>
          Allegations of criminal, unethical or improper conduct should be
          clearly identified as allegations unless the matter has been
          established through reliable evidence or an appropriate legal
          determination.
        </Body>

        <Body>
          Being arrested, questioned, accused or charged does not by itself
          establish guilt. Reports should distinguish allegations from
          established facts.
        </Body>

        <Body>
          Where appropriate, GhanaTalksRadio may seek responses from people or
          organizations named in significant allegations.
        </Body>
      </Section>

      <Section>
        <SubTitle>Use of Social Media and User-Generated Content</SubTitle>

        <Body>
          Social media is an important source of information and audience
          engagement, but content published on social platforms is not
          automatically considered verified.
        </Body>

        <Body>
          Before relying on social-media content as a significant part of a
          news report, we seek to establish its authenticity and context where
          reasonably possible.
        </Body>

        <Body>
          Comments, submissions, social-media posts and other audience
          contributions do not necessarily represent the views of
          GhanaTalksRadio.
        </Body>
      </Section>

      <Section>
        <SubTitle>Artificial Intelligence and Digital Tools</SubTitle>

        <Body>
          Digital tools, including artificial intelligence technologies, may be
          used to assist with research, transcription, translation, editing,
          content organization and other production tasks.
        </Body>

        <Body>
          Technology does not replace editorial responsibility. Human
          editorial judgment remains responsible for the accuracy,
          appropriateness and integrity of published material.
        </Body>

        <Body>
          AI-generated or automatically produced information should not be
          treated as inherently accurate and should be reviewed appropriately
          before publication.
        </Body>
      </Section>

      <Section>
        <SubTitle>Conflicts of Interest</SubTitle>

        <Body>
          Editorial contributors should avoid conflicts of interest that could
          compromise, or reasonably appear to compromise, their independence.
        </Body>

        <Body>
          Where a significant conflict is unavoidable and materially relevant
          to a story, appropriate disclosure may be made.
        </Body>
      </Section>

      <Section>
        <SubTitle>Corrections and Accountability</SubTitle>

        <Body>
          GhanaTalksRadio recognizes that mistakes can occur in journalism.
          When a material factual error is identified, we seek to correct the
          published record promptly and transparently.
        </Body>

        <Body>
          Our correction process is described in our{' '}
          <Strong>Corrections Policy</Strong>.
        </Body>
      </Section>

      <Section>
        <SubTitle>Editorial Responsibility</SubTitle>

        <Body>
          Everyone involved in the creation and publication of editorial
          content is expected to exercise reasonable care and professional
          judgment.
        </Body>

        <Body>
          Ultimately, GhanaTalksRadio remains responsible for the editorial
          integrity of content published through its platforms.
        </Body>
      </Section>

      <Section>
        <SubTitle>Contact the Editorial Team</SubTitle>

        <Body>
          Questions, concerns, corrections and feedback concerning our
          editorial practices are welcome.
        </Body>

        <ContactBox>
          <ContactItem>
            <Strong>Email:</Strong>{' '}
            <EmailLink href={`mailto:${supportEmail}`}>
              {supportEmail}
            </EmailLink>
          </ContactItem>

          <ContactItem>
            Please include the relevant article, programme or editorial matter
            when contacting us about a specific publication.
          </ContactItem>
        </ContactBox>
      </Section>
    </Article>
  );
}

export default EditorialPolicy;

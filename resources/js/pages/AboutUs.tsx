
import styled from 'styled-components';

interface AboutUsProps {
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
  margin-bottom: 0.5rem;
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

const WebsiteLink = styled.a`
  color: ${({ theme }) => theme.colors.gold ?? theme.colors.ink};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function AboutUs({ supportEmail }: AboutUsProps) {
  return (
    <Article>
      <Title>About GhanaTalksRadio</Title>

      <Section>
        <SubTitle>Ghana's Digital Radio and News Platform</SubTitle>

        <Body>
          GhanaTalksRadio is a Ghana-focused digital media and radio platform
          delivering news, live radio, music, talk programming, podcasts,
          sports, entertainment, technology, lifestyle content and
          public-interest stories to audiences in Ghana and around the world.
        </Body>

        <Body>
          Built around the principle of <Strong>giving the youth a voice</Strong>,
          GhanaTalksRadio provides a digital platform where news, ideas,
          conversations, culture and entertainment can reach audiences through
          radio, the web, mobile applications and digital media.
        </Body>

        <Body>
          GhanaTalksRadio operates as a digital-first media organization
          combining online radio broadcasting with digital journalism and
          on-demand content.
        </Body>
      </Section>

      <Section>
        <SubTitle>Our History</SubTitle>

        <Body>
          GhanaTalksRadio's digital platform dates back to <Strong>2020</Strong>,
          when its mobile radio application was introduced to make live
          programming and digital content accessible to audiences beyond
          traditional radio.
        </Body>

        <Body>
          The GhanaTalksRadio mobile application was first released in
          <Strong> May 2020</Strong> and has subsequently evolved to support
          live radio, news, shows, catch-up programming, podcasts,
          entertainment and other digital features.
        </Body>

        <Body>
          The organization has continued to develop from an online radio
          service into a broader digital media platform, publishing original
          and curated news and information across multiple areas of public
          interest.
        </Body>

        <Body>
          Our evolution reflects a simple objective: to make credible
          information, meaningful conversation and engaging African content
          accessible wherever audiences are.
        </Body>
      </Section>

      <Section>
        <SubTitle>What GhanaTalksRadio Does</SubTitle>

        <Body>
          GhanaTalksRadio operates at the intersection of radio, journalism,
          digital publishing and audience engagement.
        </Body>

        <List>
          <ListItem>Live digital radio broadcasting</ListItem>
          <ListItem>News publishing</ListItem>
          <ListItem>Political and current-affairs coverage</ListItem>
          <ListItem>Sports reporting and commentary</ListItem>
          <ListItem>Entertainment and celebrity news</ListItem>
          <ListItem>Business and financial news</ListItem>
          <ListItem>Technology coverage</ListItem>
          <ListItem>Education reporting</ListItem>
          <ListItem>Health and public-interest information</ListItem>
          <ListItem>Lifestyle and culture content</ListItem>
          <ListItem>Podcasts and on-demand programmes</ListItem>
          <ListItem>Interviews and talk shows</ListItem>
          <ListItem>Music programming</ListItem>
          <ListItem>Digital audience engagement and interactive content</ListItem>
        </List>

        <Body>
          Our website serves as a continuously updated digital publication,
          while our radio service provides live programming and entertainment.
        </Body>

        <Body>
          GhanaTalksRadio also makes its content accessible through mobile
          applications, allowing listeners to follow live broadcasts and
          access selected programmes and content on demand.
        </Body>
      </Section>

      <Section>
        <SubTitle>Our Editorial Mission</SubTitle>

        <Body>
          GhanaTalksRadio exists to <Strong>inform, engage, entertain and give
          people a platform to be heard.</Strong>
        </Body>

        <Body>
          Our editorial mission is built around providing timely information,
          meaningful conversation, useful context and engaging content to our
          audiences.
        </Body>

        <List>
          <ListItem>
            <Strong>Inform:</Strong> Provide timely news and information about
            developments affecting Ghanaian communities and audiences across
            Africa and the wider world.
          </ListItem>

          <ListItem>
            <Strong>Give People a Voice:</Strong> Create space for young people
            and members of the public to participate in conversations about
            politics, society, culture, education, sports and everyday life.
          </ListItem>

          <ListItem>
            <Strong>Explain:</Strong> Provide context that helps audiences
            understand why important events matter and how they affect
            communities.
          </ListItem>

          <ListItem>
            <Strong>Connect Ghana to the World:</Strong> Keep Ghanaians and
            African audiences connected to developments, conversations,
            culture and entertainment from home.
          </ListItem>

          <ListItem>
            <Strong>Entertain:</Strong> Provide music, podcasts, lifestyle
            programming, sports and entertainment as part of the overall
            GhanaTalksRadio experience.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>Geographical Coverage</SubTitle>

        <Body>
          GhanaTalksRadio is primarily focused on <Strong>Ghana</Strong>, with
          editorial coverage extending across the country's regions and
          communities.
        </Body>

        <Body>
          Our reporting includes national developments as well as stories
          originating from Accra and other parts of Ghana. Our international
          coverage includes major developments affecting Ghana, Africa and the
          global community, particularly where those developments are relevant
          to Ghanaian audiences.
        </Body>

        <Body>
          Because GhanaTalksRadio is a digital platform, our content is
          accessible internationally. We serve both audiences in Ghana and
          Ghanaians and Africans living in the diaspora.
        </Body>
      </Section>

      <Section>
        <SubTitle>Radio Services</SubTitle>

        <Body>
          GhanaTalksRadio is a digital radio service providing live and
          on-demand audio programming.
        </Body>

        <List>
          <ListItem>Music</ListItem>
          <ListItem>Talk shows</ListItem>
          <ListItem>News</ListItem>
          <ListItem>Current affairs</ListItem>
          <ListItem>Sports</ListItem>
          <ListItem>Entertainment</ListItem>
          <ListItem>Interviews</ListItem>
          <ListItem>Youth-focused programming</ListItem>
          <ListItem>Cultural programming</ListItem>
          <ListItem>Special broadcasts</ListItem>
        </List>

        <Body>
          Listeners can access GhanaTalksRadio through the website and
          supported mobile applications. Our digital radio model allows
          audiences to listen from computers, smartphones and other connected
          devices.
        </Body>
      </Section>

      <Section>
        <SubTitle>News Operation</SubTitle>

        <Body>
          GhanaTalksRadio operates a digital news publishing platform covering
          a broad range of subjects relevant to its audience.
        </Body>

        <List>
          <ListItem>
            <Strong>National News:</Strong> Developments involving government,
            public institutions, communities and national affairs in Ghana.
          </ListItem>

          <ListItem>
            <Strong>Politics:</Strong> Political developments, governance,
            elections, public policy, political parties and public officials.
          </ListItem>

          <ListItem>
            <Strong>Business & Finance:</Strong> Economic developments,
            businesses, banking, consumer issues and economic policy.
          </ListItem>

          <ListItem>
            <Strong>World News:</Strong> Major international developments with
            relevance to Ghanaian, African and global audiences.
          </ListItem>

          <ListItem>
            <Strong>Sports:</Strong> Football and other sports, including
            Ghanaian sports, international competitions and major sporting
            developments.
          </ListItem>

          <ListItem>
            <Strong>Entertainment:</Strong> Music, film, television,
            celebrities, events and Ghanaian and African popular culture.
          </ListItem>

          <ListItem>
            <Strong>Technology:</Strong> Digital technology, innovation,
            telecommunications, artificial intelligence and developments
            affecting the technology ecosystem.
          </ListItem>

          <ListItem>
            <Strong>Education:</Strong> Schools, universities, educational
            policy, examinations, students and developments within the
            education sector.
          </ListItem>

          <ListItem>
            <Strong>Health:</Strong> Public health, healthcare, medical
            developments and health-related issues of public interest.
          </ListItem>

          <ListItem>
            <Strong>Lifestyle & Culture:</Strong> Stories covering society,
            relationships, food, culture, fashion, entertainment trends and
            everyday life.
          </ListItem>

          <ListItem>
            <Strong>Crime & Public Safety:</Strong> Significant crime,
            law-enforcement and public-safety developments.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>Editorial Independence</SubTitle>

        <Body>
          GhanaTalksRadio's editorial operation is guided by the principles of
          <Strong> accuracy, fairness, accountability and public interest.</Strong>
        </Body>

        <Body>
          Editorial decisions should be based on the relevance and
          newsworthiness of information rather than political, commercial or
          personal interests.
        </Body>

        <Body>
          Where a story involves allegations or disputed claims,
          GhanaTalksRadio seeks to distinguish allegations from established
          facts and, where appropriate, provide relevant responses or
          perspectives.
        </Body>

        <Body>
          When an error is identified, we seek to correct the record
          transparently and promptly.
        </Body>
      </Section>

      <Section>
        <SubTitle>Editorial Policy</SubTitle>

        <Body>
          GhanaTalksRadio is committed to responsible digital journalism and
          maintains editorial standards designed to protect accuracy,
          fairness, public interest and audience trust.
        </Body>

        <List>
          <ListItem>
            <Strong>Accuracy:</Strong> We seek to verify information before
            publication and distinguish confirmed information from claims,
            allegations, opinions and speculation.
          </ListItem>

          <ListItem>
            <Strong>Fairness:</Strong> Where a matter involves significant
            competing positions, we seek to represent relevant perspectives
            fairly.
          </ListItem>

          <ListItem>
            <Strong>Attribution:</Strong> Information obtained from external
            sources should be appropriately attributed.
          </ListItem>

          <ListItem>
            <Strong>Public Interest:</Strong> We prioritize information that
            is relevant to the lives, safety, rights, opportunities and
            interests of our audiences.
          </ListItem>

          <ListItem>
            <Strong>Corrections:</Strong> Where a material factual error is
            identified, GhanaTalksRadio may amend the published material and,
            where appropriate, acknowledge the correction.
          </ListItem>

          <ListItem>
            <Strong>Privacy:</Strong> Private individuals should not have
            their personal information unnecessarily exposed where there is
            no legitimate public-interest justification.
          </ListItem>

          <ListItem>
            <Strong>Source Protection:</Strong> Journalistic sources may
            require confidentiality. Where confidentiality is granted,
            GhanaTalksRadio seeks to protect the identity of the source,
            subject to applicable law and editorial considerations.
          </ListItem>

          <ListItem>
            <Strong>Editorial and Commercial Separation:</Strong> Commercial
            relationships should not determine the factual content or
            editorial conclusions of news reports.
          </ListItem>

          <ListItem>
            <Strong>No Deliberate Misinformation:</Strong> GhanaTalksRadio
            does not knowingly publish false information as fact.
          </ListItem>

          <ListItem>
            <Strong>User-Generated Content:</Strong> Comments, submissions,
            social-media posts and other audience contributions do not
            necessarily represent the views of GhanaTalksRadio.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>Our Audience</SubTitle>

        <Body>
          GhanaTalksRadio serves a broad audience, with particular attention
          to young people, digitally connected audiences, radio listeners,
          news consumers and Ghanaians in the diaspora.
        </Body>

        <Body>
          Our platform brings together radio listeners, readers, podcast
          audiences and digital communities through a single media ecosystem.
        </Body>

        <Body>
          The goal is not simply to publish content, but to create an
          environment where audiences can <Strong>listen, read, participate,
          discuss and stay informed.</Strong>
        </Body>
      </Section>

      <Section>
        <SubTitle>Ownership & Company Information</SubTitle>

        <Body>
          GhanaTalksRadio operates under <Strong>Ghana Talks Radio LTD</Strong>,
          the organization identified as the developer and provider of the
          GhanaTalksRadio mobile application.
        </Body>

        <Body>
          Ghana Talks Radio LTD operates in the radio and digital media space,
          with GhanaTalksRadio serving as its digital radio and media platform.
        </Body>

        <ContactBox>
          <ContactItem>
            <Strong>Company:</Strong> Ghana Talks Radio LTD
          </ContactItem>

          <ContactItem>
            <Strong>Platform:</Strong> GhanaTalksRadio
          </ContactItem>

          <ContactItem>
            <Strong>Website:</Strong>{' '}
            <WebsiteLink
              href="https://ghanatalksradio.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ghanatalksradio.com
            </WebsiteLink>
          </ContactItem>

          <ContactItem>
            <Strong>Email:</Strong>{' '}
            <EmailLink href={`mailto:${supportEmail}`}>
              {supportEmail}
            </EmailLink>
          </ContactItem>

          <ContactItem>
            <Strong>Telephone:</Strong> +44 7404 057874
          </ContactItem>
        </ContactBox>
      </Section>

      <Section>
        <SubTitle>Contact GhanaTalksRadio</SubTitle>

        <Body>
          We welcome enquiries from listeners, readers, journalists,
          organizations, businesses, media professionals and members of the
          public.
        </Body>

        <Body>
          For general enquiries, news tips, corrections, partnerships and media
          enquiries, please contact our team through the official contact
          channels.
        </Body>

        <ContactBox>
          <ContactItem>
            <Strong>Email:</Strong>{' '}
            <EmailLink href={`mailto:${supportEmail}`}>
              {supportEmail}
            </EmailLink>
          </ContactItem>

          <ContactItem>
            <Strong>Website:</Strong>{' '}
            <WebsiteLink
              href="https://ghanatalksradio.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.ghanatalksradio.com
            </WebsiteLink>
          </ContactItem>
        </ContactBox>
      </Section>

      <Section>
        <SubTitle>Our Commitment</SubTitle>

        <Body>
          GhanaTalksRadio will continue to invest in digital journalism, radio
          broadcasting, technology and audience engagement while maintaining
          our commitment to responsible publishing.
        </Body>

        <Body>
          We believe that media should inform people, encourage meaningful
          conversation, represent diverse perspectives and provide communities
          with a platform to be heard.
        </Body>

        <Body>
          That is the purpose behind GhanaTalksRadio.
        </Body>

        <Body>
          <Strong>Giving the youth a voice. Your voice. Your stories. Your station.</Strong>
        </Body>
      </Section>
    </Article>
  );
}

export default AboutUs;

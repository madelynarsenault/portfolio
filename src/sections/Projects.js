import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';
import Hide from '../components/Hide';

const Background = () => (
  <div>
    
    
  </div>
);

const CARD_HEIGHT = '320px';
// const CARD_WIDTH

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 85px;
  width: 100%;
  width: 100%);

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: 500px;

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`;

const ProjectImage = styled(Image)`
  width: 25vw;
  height: ${CARD_HEIGHT};
  padding: 40px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT} / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`;

const ProjectTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 3.5px
  ); /*don't know why I have to add 3.5px here ... */

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`;

const Project = ({
  name,
  description,
  projectUrl,
  repositoryUrl,
  type,
  publishedDate,
  logo,
}) => (
  <Card className="cardContainer1" p={2}>
    <Flex style={{ height: CARD_HEIGHT }}>
      <TextContainer>
        <span>
          <Title className="projectTitle1" my={1} pb={1}>
            {name}
          </Title>
        </span>
        <Text className="projectContent1" width={[1]} style={{ overflow: 'auto' }}>
          {description}
        </Text>
      </TextContainer>

      <ImageContainer className="imgContainer1">
        <ProjectImage className="projectImage2" src={logo.image.src} alt={logo.title} />
        <ProjectTag>
          <Flex
            style={{
              float: 'right',
            }}
          >
            <Box mx={1} fontSize={5}>
              <SocialLink
                name="Check repository"
                fontAwesomeIcon="github"
                url={repositoryUrl}
              />
            </Box>
            <Box mx={1} fontSize={5}>
              <SocialLink
                name="See project"
                fontAwesomeIcon="globe"
                url={projectUrl}
              />
            </Box>
          </Flex>
          <ImageSubtitle bg="primary" color="white" y="bottom" x="right" round>
            {type}
          </ImageSubtitle>
          <Hide query={MEDIA_QUERY_SMALL}>
            <ImageSubtitle bg="backgroundDark">{publishedDate}</ImageSubtitle>
          </Hide>
        </ProjectTag>
      </ImageContainer>
    </Flex>
  </Card>
);

Project.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projectUrl: PropTypes.string.isRequired,
  repositoryUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }).isRequired,
};

const Projects = () => (
  <Section.Container id="projects" Background={Background}>
    <Section.Header name="Projects" icon="" label="notebook" />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          contentfulAbout {
            projects {
              id
              name
              description
              projectUrl
              repositoryUrl
              publishedDate(formatString: "YYYY")
              type
              logo {
                title
                image: resize(width: 350, quality: 100) {
                  src
                }
              }
            }
          }
        }
      `}
      render={({ contentfulAbout }) => (
        <CardContainer minWidth="440px">
          {contentfulAbout.projects.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.id}>
              <Project {...p} />
            </Fade>
          ))}
        </CardContainer>
      )}
    />
  </Section.Container>
);

export default Projects;

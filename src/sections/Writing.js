import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import FontAwesomeIcon from 'react-fontawesome';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';

const MEDIUM_CDN = 'https://cdn-images-1.medium.com/max/400';
const MEDIUM_URL = 'https://medium.com';

const Background = () => (
  <div>
   
  </div>
);

const CoverImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const Post = ({ title, text, image, url, date, time }) => (
  <Card onClick={() => window.open(url, '_blank')} pb={4}>
    <EllipsisHeading m={3} p={1}>
      {title}
    </EllipsisHeading>
    {image && <CoverImage src={image} height="200px" alt={title} />}
    <Text m={3}>{text}</Text>
    <ImageSubtitle bg="primary" color="white" x="right" y="bottom" round>
      {`${date} - ${Math.ceil(time)} min`}
    </ImageSubtitle>
  </Card>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

const parsePost = author => postFromGraphql => {
  const { id, uniqueSlug, createdAt, title, virtuals } = postFromGraphql;
  const image =
    virtuals.previewImage.imageId &&
    `${MEDIUM_CDN}/${virtuals.previewImage.imageId}`;

  return {
    id,
    title,
    time: virtuals.readingTime,
    date: createdAt,
    text: virtuals.subtitle,
    image,
    url: `${MEDIUM_URL}/${author.username}/${uniqueSlug}`,
    Component: Post,
  };
};

const MorePosts = ({ username, name, number }) => (
  <Card
    onClick={() => window.open(`${MEDIUM_URL}/${username}/`, '_blank')}
    p={4}
  >
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      style={{ height: '100%' }}
    >
      <Box>
        <EllipsisHeading fontSize={5} my={2}>
          Hooray! &nbsp;
          <span role="img" aria-label="party">
            
          </span>
        </EllipsisHeading>
        <Heading lineHeight={1.5}>
          It seems that
          <Text color="secondary">{name}</Text>
          {`has published ${number} more posts!`}
        </Heading>
      </Box>
      <Heading color="primary" mt={5} textAlign="right">
        Go to Medium &nbsp;
        <FontAwesomeIcon name="arrow-right" aria-label="Go to Medium" />
      </Heading>
    </Flex>
  </Card>
);

MorePosts.propTypes = {
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
};

const edgeToArray = data => data.edges.map(edge => edge.node);

const Writing = () => (
  <StaticQuery
    query={graphql`
      query MediumPostQuery {
        site {
          siteMetadata {
            isMediumUserDefined
          }
        }
        allMediumPost(limit: 7, sort: { fields: createdAt, order: DESC }) {
          totalCount
          edges {
            node {
              id
              uniqueSlug
              title
              createdAt(formatString: "MMM YYYY")
              virtuals {
                subtitle
                readingTime
                previewImage {
                  imageId
                }
              }
            }
          }
        }
        author: mediumUser {
          username
          name
        }
      }
    `}
    render={({ allMediumPost, site, author }) => {
      const posts = edgeToArray(allMediumPost).map(parsePost(author));

      const diffAmountArticles = allMediumPost.totalCount - posts.length;
      if (diffAmountArticles > 0) {
        posts.push({
          ...author,
          id: 'more-field',
          number: diffAmountArticles,
          Component: MorePosts,
        });
      }

      const { isMediumUserDefined } = site.siteMetadata;

      return (
        isMediumUserDefined && (
          <Section.Container id="Skills" Background={Background}>
            <Section.Header name="Skills and info" icon="" label="writing" />
            <div className="div1">
           <div className="skillsDiv">
             <h1 className="skills2">Skills</h1>
             <ul className="codeTypes">
               <li>React</li>
               <li>Node.JS</li>
               <li>SQL</li>
               <li>SASS</li>
               <li>Javascript</li>
               <li>CSS</li>
               <li>HTML5</li>
               <li>Express</li>

             </ul>
             
          </div>
          <div className="infoDiv">
            <h1 className="info">Info</h1>
            <ul className="personalInfo">
              <li>Name- Madelyn Arsenault</li>
              <li>DOB- 08/24/1999</li>
              <li>Email- madelyn.arsenault@gmail.com</li>
              <li>Location- Dallas, TX</li>
            </ul>
          </div>
          </div>
            {/* <CardContainer minWidth="300px">
              {posts.map(({ Component, ...rest }) => (
                <Fade bottom key={rest.id}>
                  <Component {...rest} key={rest.id} />
                </Fade>
              ))}
            </CardContainer> */}
          </Section.Container>
        )
      );
    }}
  />
);

export default Writing;

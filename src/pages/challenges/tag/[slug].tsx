import { Challenges } from "components/Challenges";
import { Header } from "components/Header";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { prisma } from 'lib/prisma'
import { IChallenge, ITag } from "interfaces/challenges.interface";
import Head from "next/head";
import { HomePageContainer } from "styles/pages/homePage";
import { useRouter } from "next/router";
import { Spinner } from "components/Spinner";

interface TagProps {
  challenges: IChallenge[]
  tag: ITag
}

const Tag: NextPage<TagProps> = ({ challenges, tag }) => {
  const { isFallback } = useRouter();

  if(isFallback) return <Spinner/>

  return (
    <HomePageContainer>
      <Head>
        <title>{`${tag.name} Challenges | upskill.code`}</title>
      </Head>
      <Header/>
      <Challenges title={`${tag.name} Challenges`} challenges={challenges} />
    </HomePageContainer>
  );
};

export default Tag;

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await prisma.tag.findMany()

  const paths = tags.map((tag) => ({
    params: {
      slug: tag.slug
    }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async(ctx) => {
  const { slug } = ctx.params as { slug: string }

  const tag = await prisma.tag.findUnique({
    where: {
      slug,
    }
  })  

  if(!tag) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const challenges = await prisma.challenge.findMany({
    where: {
      tags: {
        some: {
          tagId: tag.id
        }
      }
    }, 
    include: {
      tags: {
        include: {
          tag:true
        }
      }
    }
  })

  const parsedChallenges = challenges.map((challenge) => ({
    ...challenge,
    tags: [...challenge.tags.map(tag => tag.tag)]  
  }))

  return {
    props: {
      challenges: parsedChallenges,
      tag,
    },
    revalidate: 86400
  }
}
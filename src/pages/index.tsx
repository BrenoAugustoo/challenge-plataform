import { Challenges } from "components/Challenges";
import { Header } from "components/Header";
import type { GetStaticProps, NextPage } from "next";
import { HomePageContainer } from "../styles/pages/homePage";
import { prisma } from 'lib/prisma'
import { IChallenge } from "interfaces/challenges.interface";
import Head from "next/head";

interface HomeProps {
  challenges: IChallenge[]
}

const Home: NextPage<HomeProps> = ({ challenges }) => {
  return (
    <HomePageContainer>
      <Head>
        <title>Challenges | upskill.code</title>
      </Head>
      <Header/>
      <Challenges challenges={challenges} />
    </HomePageContainer>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async() => {
  const challenges = await prisma.challenge.findMany({
    include: {
      tags: {
        include: {
          tag: true
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
      challenges: parsedChallenges
    },
    revalidate: 86400
  }
}
import { ChallengeSideBar } from "components/ChallengeSideBar";
import { CodeEditor } from "components/CodeEditor";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { ChallengePageContainer } from "styles/pages/challengePage";
import { prisma } from 'lib/prisma'
import { IChallenge } from "interfaces/challenges.interface";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

interface ChallengeProps {
  challenge: IChallenge
}

const Challenge: NextPage<ChallengeProps> = ({ challenge }) => {
  const [instructions, setInstructions] = useState('')

  return (
    <ChallengePageContainer>
      <Head>
        <title>{`${challenge.title} | upskill.code`}</title>
      </Head>
      <CodeEditor embedId={challenge.embedId} setInstructions={setInstructions} />
      <ChallengeSideBar challengeTitle={challenge.title} instructions={instructions}/>
    </ChallengePageContainer>
  )
}

export default Challenge

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const {slug} = ctx.params as {slug: string}

  const challenge = await prisma.challenge.findUnique({
    where: {
      slug,
    }
  })

  if(!challenge) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      challenge
    }
  }
}

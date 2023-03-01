import Link from "next/link";
import { ChallengeCardContainer, DifficultyTag, TagItem, TagsContainer } from "./styles";
import { BiLinkExternal } from 'react-icons/bi'
import { IChallenge } from "interfaces/challenges.interface";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

interface ChallengeCardProps {
  challenge: IChallenge
}

export function ChallengeCard({challenge}: ChallengeCardProps) {
  const router = useRouter()
  function navigateToTagPage(e: MouseEvent, tag: string) {
    e.preventDefault()
    router.push(`/challenges/tag/${tag}`)
  }

  return (
    <Link href={`/challenges/${challenge.slug}`} passHref>
      <ChallengeCardContainer>
        <header>
          <DifficultyTag difficulty={challenge.difficulty} >
            {challenge.difficulty}
          </DifficultyTag>
          <BiLinkExternal/>
        </header>

        <h3>{challenge.title}</h3>
        <p>{challenge.description}</p>

        <TagsContainer>
          {challenge.tags.map(tag => (
            <TagItem key={tag.slug} onClick={(e) => navigateToTagPage(e, tag.slug)} >{tag.name}</TagItem>
          ))}
        </TagsContainer>
      </ChallengeCardContainer>
    </Link>
  )
}
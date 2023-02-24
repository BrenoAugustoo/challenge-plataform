import Link from "next/link";
import { ChallengeCardContainer, DifficultyTag, TagItem, TagsContainer } from "./styles";
import { BiLinkExternal } from 'react-icons/bi'

export function ChallengeCard() {
  return (
    <Link href="/challenges/teste" passHref>
      <ChallengeCardContainer>
        <header>
          <DifficultyTag difficulty="Hard" >
            Hard
          </DifficultyTag>
          <BiLinkExternal/>
        </header>

        <h3>To Be List</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, blanditiis.</p>

        <TagsContainer>
          <TagItem>React</TagItem>
          <TagItem>Styled Components</TagItem>
        </TagsContainer>
      </ChallengeCardContainer>
    </Link>
  )
}
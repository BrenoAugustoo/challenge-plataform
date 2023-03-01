import { ChallengeCard } from "components/ChallengeCard";
import { IChallenge } from "interfaces/challenges.interface";
import { ChallengesContainer } from "./styles";

interface ChallengeProps {
  challenges: IChallenge[]
  title: string
}

export function Challenges ({ title, challenges }: ChallengeProps) {
  return (
    <ChallengesContainer>
      <h2>{title}</h2>

      <div>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </ChallengesContainer>
  )
}
import { ChallengeCard } from "components/ChallengeCard";
import { IChallenge } from "interfaces/challenges.interface";
import { ChallengesContainer } from "./styles";

interface ChallengeProps {
  challenges: IChallenge[]
}

export function Challenges ({ challenges }: ChallengeProps) {
  return (
    <ChallengesContainer>
      <h2>All Challenges</h2>

      <div>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </ChallengesContainer>
  )
}
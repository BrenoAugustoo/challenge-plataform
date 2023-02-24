import { ChallengeCard } from "components/ChallengeCard";
import { ChallengesContainer } from "./styles";

export function Challenges () {
  return (
    <ChallengesContainer>
      <h2>All Challenges</h2>

      <div>
        <ChallengeCard/>
        <ChallengeCard/>
        <ChallengeCard/>
        <ChallengeCard/>
        <ChallengeCard/>
        <ChallengeCard/>
      </div>
    </ChallengesContainer>
  )
}
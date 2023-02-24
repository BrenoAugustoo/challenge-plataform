import { ChallengeSideBar } from "components/ChallengeSideBar";
import { CodeEditor } from "components/CodeEditor";
import { NextPage } from "next";
import { useState } from "react";
import { ChallengePageContainer } from "styles/pages/challengePage";

const Challenge: NextPage = () => {
  const [instructions, setInstructions] = useState('')

  return (
    <ChallengePageContainer>
      <CodeEditor setInstructions={setInstructions} />
      <ChallengeSideBar instructions={instructions}/>
    </ChallengePageContainer>
  )
}

export default Challenge

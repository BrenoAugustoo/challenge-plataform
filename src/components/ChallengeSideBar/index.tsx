import { useState } from "react";
import { ChallengeSideBarContainer, InstructionsContainer, SidebarContent } from "./styles";

import {BsFillArrowLeftSquareFill} from 'react-icons/bs'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw'
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useRouter } from "next/router";

interface ChallengeSideBarProps {
  instructions: string
}

export function ChallengeSideBar({ instructions }:ChallengeSideBarProps ) {
  const [isOpen, setIsOpen] = useState(true)

  const router = useRouter()

  function backToHome() {
    router.push("/")
  }

  return ( 
    <ChallengeSideBarContainer isOpen={isOpen} >
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} >
          <BsFillArrowLeftSquareFill />
        </button>
      ) }

      <SidebarContent>
        <header>
          <div>
            <button onClick={backToHome} >back to home</button>
            <button onClick={() => setIsOpen(false)}>hide panel</button>
          </div>
          <h1>To Do List</h1>
        </header>

        <InstructionsContainer
          children={instructions}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={dracula as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </SidebarContent>
    </ChallengeSideBarContainer>
  )
}
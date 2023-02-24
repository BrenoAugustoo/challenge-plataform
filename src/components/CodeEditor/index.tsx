import sdk, { VM } from "@stackblitz/sdk";
import { useCallback, useEffect, useRef } from "react";
import { CodeEditorContainer } from "./styles";

const AUTOSAVE_IN_MS = 10000

interface CodeEditorProps {
  setInstructions: (instructions: string) => void;
}

export function CodeEditor({setInstructions}: CodeEditorProps) {
  const projectId = "todo-list-challenge"
  const vm = useRef<VM | null>(null);
  const loadVM = useCallback( async () => {
    vm.current = await sdk.embedProjectId("embed", projectId , {
      view: "editor",
      openFile: 'src/App.tsx'
    })

    const snapshot = await vm.current.getFsSnapshot();

    if(snapshot) {
      const instructions = snapshot["README.md"]
      setInstructions(instructions)
    }

    const storagedData = localStorage.getItem(`savedData:${projectId}`)

    if(storagedData) {
      await new Promise((resolve) => setTimeout(resolve, 5000))
      const parsed = JSON.parse(storagedData)                                                                                                                                                                                   
      await vm.current.applyFsDiff({
        create: {
          ...parsed
        },
        destroy: []
      })
    }
  }, [setInstructions])

  useEffect(() => {
    loadVM()
  }, [loadVM])

  useEffect(() => {
    const interval = setInterval(async () => {
      if(!vm?.current) return;

      const snapshot = await vm.current.getFsSnapshot();

      if(snapshot) {
        localStorage.setItem(`savedData:${projectId}`, JSON.stringify(snapshot))
      }
    }, AUTOSAVE_IN_MS);

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <CodeEditorContainer id="embed" />
  )
}
'use client';
import PromptForm from "@/components/PromptForm";
import { useDebugValue, useState } from "react";

import Head from "./Header";
import Foot from "./Footer";

export default function Home() {
  const [choices, setChoices] = useState([]);
  const  [isLoading, setIsLoading] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head/>
      <PromptForm
        isLoading={isLoading}
        onSubmit={async (prompt) => {
          const response = await fetch('/api/chat-gpt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt,
            }),
          });
          setIsLoading(false);
          const result = await response.json();
          setChoices(result.choices);
        }}
      />
      {choices.map((choice) => {
        console.log(choice);
        const resArr = choice.message.content.split('.');
        return (
          <div
            key={choice.index}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-2xl mb-4 font-bold">Response: </h1>
            <p className="mb-2 border-b">
              <b>What:</b> <span>{resArr[0]}</span>
            </p>
            <p className="mb-2 border-b">
              <b>Why:</b> <span>{resArr[1]}</span>
            </p>
            <p className="mb-2">
              <b>How:</b> <span>{resArr[2]}</span>
            </p>
          </div>
        );
      })}
      <Foot></Foot>
    </main>
  )
}
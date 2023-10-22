import { useState } from 'react';

export default function PromptForm({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState('');

  const [topic, setTopic] = useState('');
  const [field, setField] = useState('');
  const [query, setQuery] = useState('');

  const [question, SetQuestion] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        SetQuestion(
          `Question: In ${topic} regarding ${field} what is ${query}`
        );
        setPrompt(
          `In ${topic} regarding ${field} what is: ${query} and respond in three sentances with What it is, Why it is important, and How I can use it, in that order.`
        );
        console.log(prompt);

        //Callback
        if (prompt === '') {
          return;
        }

        onSubmit(prompt);
        setPrompt('');
      }}
    >
      <h1 className="text-center text-2xl mb-2">Question</h1>
      <div className="flex gap-4 justify-center">
        <div>
          <label>Topic:</label>
          <input
            type="text"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Field:</label>
          <input
            type="text"
            onChange={(e) => {
              setField(e.target.value);
            }}
          />
        </div>
      </div>

      <div>
        <label>What is:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <p className="font-bold mt-4 text-green-700">
        <span>{question}</span>
      </p>
      <input type="submit" disabled={isLoading} />
    </form>
  );
}

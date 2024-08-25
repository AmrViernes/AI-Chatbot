"use client";
import Image from "next/image";
import { AiChat, useAsStreamAdapter } from "@nlux/react";
//import { streamText } from "./stream";
import "@nlux/themes/nova.css";
import Link from "next/link";
import { useAsBatchAdapter, ChatAdapterExtras } from '@nlux/react';


export default function HomePage() {
  // We transform the streamText function into an adapter that <AiChat /> can use
  //const chatAdapter = useAsStreamAdapter(streamText);
  const myCustomAdapter = useAsBatchAdapter(
    (message: string, extras: ChatAdapterExtras): Promise<string> => {
      return fetch('http://localhost:5000/generate', {
        method: 'POST',
        body: JSON.stringify({ message })
      })
        .then(response => response.json())
        .then(json => json.prompt);
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-50">
      <PageHeader />
      <div className="aiChat-container">
        <AiChat
          adapter={myCustomAdapter}
          personaOptions={{
            assistant: {
              name: "Hospital Customer Care Assistant",
              avatar:
                "https://www.logolynx.com/images/logolynx/85/856586486a2bba6f02e064757e495c9d.png",
              tagline: "How may I assist you today?",
            },
            user: {
              name: "Alex",
              avatar: "https://docs.nlkit.com/nlux/images/personas/alex.png",
            },
          }}
          displayOptions={{
            width: 1000,
            height: 500,
          }}
        />
      </div>
      <PageFooter />
    </main>
  );
}

const PageHeader = () => {
  return (
    <nav className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <section>
        <Link
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="#"
          rel="noopener noreferrer"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            className=""
            width={60}
            height={32}
            priority
          />
        </Link>
      </section>
      <section className="fixed left-0 top-0 flex justify-center pb-6 pt-8 backdrop-blur-2xl lg:static w-auto p-4 font-bold text-gray-800">AI Assistant</section>
    </nav>
  );
};

const PageFooter = () => {
  return (
    <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left"></div>
  );
};

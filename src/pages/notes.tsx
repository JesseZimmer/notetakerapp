import { type NextPage } from "next";
import { Router } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { api, type RouterOutputs } from "../utils/api";
import React, { useState } from "react";

const NotesPage: NextPage = (props) => {
  const { data: sessionData, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className="grid h-screen place-items-center">
        <div className="flex flex-col items-center">
          <p>You are not authorized to view this page.</p>
          <Link href="/" className="link-error">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="m-2">
        <div className="grid grid-cols-4">
          <div className="flex flex-col">
            <div className=" text-lg">
              Welcome back {sessionData?.user?.name}
            </div>
            <div>Topics</div>
            <Content />
          </div>
          <div className="col-span-3"></div>
        </div>
      </div>
    </>
  );
};

export default NotesPage;

type Topic = RouterOutputs["topic"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSeletedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refreshTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSeletedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refreshTopics();
    },
  });

  return (
    <>

      {topics?.map((topic) => (
        <li key={topic.id}>
          {topic.title}
        </li>
      ))}

      <div className="divider"></div>

      <form>
        <input
          type="tex"
          placeholder="New Topic"
          className="input-bordered w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </form>
    </>
  );
};

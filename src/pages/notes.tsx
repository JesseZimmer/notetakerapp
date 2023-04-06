import { type NextPage } from "next";
import { Router } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { api, type RouterOutputs } from "../utils/api";
import React, { useState } from "react";
import { NoteCard } from "../components/noteCard";

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
      <div className="ml-4 mt-4">
        <div className=" text-lg">
          Welcome back
          <div> {sessionData?.user?.name}</div>
        </div>

        <Content />
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
      onSuccess: () => {
        setSeletedTopic(null);
        setShowNewTopic(false);
        setEditTopic(false);
      },
    }
  );

  const [showNewTopic, setShowNewTopic] = useState(false);
  const [editTopic, setEditTopic] = useState(false);
  const [updatedTopic, setUpdatedTopic] = useState("");

  function handleNewTopic() {
    setShowNewTopic((current) => !current);
  }

  function handleEditTopic() {
    setEditTopic((current) => !current);
  }

/*   const handleUpdatedTopic = (event) => {
    setUpdatedTopic(event.target.value);
  }; */

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refreshTopics();
    },
  });

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      void refreshTopics();
    },
  });

  const updateTopic = api.topic.update.useMutation({
    onSuccess: () => {
      void refreshTopics();
    },
  });

  return (
    <>
      <div className="grid grid-cols-4 gap-9">
        <div className="grid-cols-1">
          {topics?.map((topic) => (
            <p
              className="w-full rounded-2xl pl-2 hover:bg-blue-300 focus:bg-blue-500 focus:text-white"
              key={topic.id}
              onClick={(e) => {
                e.preventDefault();
                setSeletedTopic(topic);
              }}
            >
              <a href="#" className="">
                {topic.title}
              </a>
            </p>
          ))}
          <div className="divider"></div>
          <div className="flex flex-col">
            {selectedTopic ? (
              <></>
            ) : (
              <button
                className="btn-sm btn mb-2 w-1/2 min-w-fit"
                onClick={handleNewTopic}
              >
                New Topic
              </button>
            )}
            {showNewTopic && (
              <input
                type="tex"
                placeholder="Press Enter to submit topic"
                className=" w-full flex-none border border-black px-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    createTopic.mutate({
                      title: e.currentTarget.value,
                    });
                    e.currentTarget.value = "";
                  }
                }}
              />
            )}
            {selectedTopic && (
              <button
                className="btn-sm btn m-2 w-1/2 min-w-fit"
                onClick={handleEditTopic}
              >
                Edit {selectedTopic?.title}
              </button>
            )}
            {editTopic && (
              <div>
                <input
                  id="updateTopicInput"
                  type="text"
                  placeholder={selectedTopic?.title}
                  onChange={event => setUpdatedTopic(event.target.value)}
                  className=" mb-2 w-full flex-none border border-black px-1"
                />
                <div className="flex flex-row gap-2">
                  <button
                    className="btn-sm btn"
                    onClick={() =>
                      void updateTopic.mutate({
                        title: updatedTopic,
                        id: selectedTopic?.id as string,
                      })
                    }
                  >
                    Update
                  </button>
                  <button
                    className="btn-sm btn"
                    onClick={() =>
                      void deleteTopic.mutate({ id: selectedTopic?.id as string })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedTopic && (
          <div className="col-span-3">
            <NoteCard topic={selectedTopic?.title || ""} />
          </div>
        )}
      </div>
    </>
  );
};

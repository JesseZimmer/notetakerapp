import { type NextPage } from "next";
import { Router } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { api } from "../utils/api";

const TopicsPage: NextPage = (props) => {
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
      <div>
        <div>Hello {sessionData?.user?.name}</div>
      </div>
    </>
  );
};

export default TopicsPage;

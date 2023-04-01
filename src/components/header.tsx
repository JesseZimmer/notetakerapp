import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar flex justify-between bg-cyan-500 text-primary-content">
      <div>Jesse&apos;s Note Taking App</div>
      <div className="flex-none gap-2">
        {sessionData?.user ? (
          <div>
            <button
              onClick={() =>
                void signOut({ callbackUrl: "/" })
              }
            >
              Sign Out
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

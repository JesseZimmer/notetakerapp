import { useState } from "react";

export const NoteCard = ({ topic }: { topic: string }) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="m-4">
          <div>
            <h1 className="text-2xl font-semibold mb-10">{topic} Notes</h1>
          </div>
          <div>
            <h2>Content</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </>
  );
};

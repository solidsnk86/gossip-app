import React from "react";

type PostsLengthProps = {
  dataLength: any;
};

export const PostsLength: React.FC<PostsLengthProps> = ({ dataLength }) => {
  return (
    <div className="my-10 w-fit justify-center mx-auto">
      {dataLength && dataLength.length > 0 ? (
        <h4 className="px-2 py-1 dark:bg-zinc-800/60 bg-zinc-200 rounded-full">
          Tus publicaciones {dataLength.length}
        </h4>
      ) : (
        <h4 className="px-2 py-1 dark:bg-zinc-800/60 bg-zinc-200 rounded-full">
          !Que macana que no hay chismes che 🧉!
        </h4>
      )}
    </div>
  );
};

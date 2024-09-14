import React from "react";

type PostsLengthProps = {
  dataLength: any;
};

export const PostsLength: React.FC<PostsLengthProps> = ({ dataLength }) => {
  return (
    <div className="mb-6 w-fit justify-center mx-auto">
      {dataLength && dataLength.length > 0 ? (
        <h4 className="px-3 py-1 bg-primary-foreground rounded-full">
          Tus publicaciones {dataLength.length}
        </h4>
      ) : (
        <h4 className="px-3 py-1 bg-primary-foreground rounded-full">
          !Que macana que no hay chismes che 🧉!
        </h4>
      )}
    </div>
  );
};

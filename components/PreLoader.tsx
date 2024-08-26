"use-client";

import { useState, useEffect } from "react";

export const PreLoader = () => {
  const [loaderVisible, setLoaderVisible] = useState<boolean>(true);

  useEffect(() => {
    const preloader = setTimeout(() => {
      setLoaderVisible(true);
    }, 3000);

    return clearTimeout(preloader);
  }, []);

  return (
    loaderVisible && (
      <div className="loader-background">
        <div className="loader"></div>
      </div>
    )
  );
};

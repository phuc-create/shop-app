import React from "react";
const Loading = () => {
  return (
    <div className="loading-page">
      <img
        className="gif-cat-loading"
        src="https://media.giphy.com/media/132hKNca5YBgCk/source.gif"
        alt="loading"
      />
      <p className="on-load-pleaseWait">Loading..........</p>
    </div>
  );
};

export default Loading;

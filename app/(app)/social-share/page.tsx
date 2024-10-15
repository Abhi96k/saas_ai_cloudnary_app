import React from "react";

const SocialSharePage: React.FC = () => {
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    let shareLink = "";
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`;
        break;
      default:
        break;
    }
    window.open(shareLink, "_blank");
  };

  return (
    <div>
      <h1>Share this page</h1>
      <button onClick={() => handleShare("facebook")}>Share on Facebook</button>
      <button onClick={() => handleShare("twitter")}>Share on Twitter</button>
      <button onClick={() => handleShare("linkedin")}>Share on LinkedIn</button>
    </div>
  );
};

export default SocialSharePage;

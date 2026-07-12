import { useState } from "react";

export default function DiscussionCard({
  author,
  time,
  title,
  content,
  replies,
  helpful,
  onRepliesClick,
}) {

    const [helpfulCount, setHelpfulCount] = useState(helpful);
const [clicked, setClicked] = useState(false);

  return (
    <div className="bg-[#1E293B] rounded-xl p-5 border border-gray-700 hover:border-violet-500 transition">

      {/* Top */}
      <div className="flex justify-between items-center">
        <span className="text-violet-400 font-medium">
          {author}
        </span>

        <span className="text-gray-500 text-sm">
          {time}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mt-4">
        {title}
      </h3>

      {/* Content */}
      <p className="text-gray-300 mt-3">
        {content}
      </p>

      {/* Bottom */}
      <div className="flex gap-6 mt-5 text-sm text-gray-400">

        <button
  onClick={() => {
    if (!clicked) {
      setHelpfulCount(helpfulCount + 1);
      setClicked(true);
    }
  }}
  className={`transition ${
    clicked
      ? "text-cyan-400 font-semibold"
      : "hover:text-cyan-400"
  }`}
>
  👍 Helpful ({helpfulCount})
</button>

        <button
  onClick={onRepliesClick}
  className="hover:text-violet-400"
>
  💬 Replies ({replies.length})
</button>

      </div>

    </div>
  );
}
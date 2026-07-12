import { useState } from "react";
import DiscussionCard from "../components/DiscussionCard";
import TopicChip from "../components/TopicChip";
import ReplyModal from "../components/ReplyModal";

export default function CommunityHub() {
  const [discussions, setDiscussions] = useState([
    {
      author: "Anonymous Dancer",
      time: "5 min ago",
      category: "Practice",
      title: "How do you stay on beat without hearing clearly?",
      content:
        "I've been practicing with visual beat indicators and they're helping a lot. Any other tips?",
      helpful: 14,
      replies: [
  "Visual beat indicators helped me a lot!",
  "Try practicing with vibrations too.",
],
    },
    {
      author: "Anonymous Performer",
      time: "18 min ago",
      category: "Beginner",
      title: "Looking for beginner-friendly choreography",
      content:
        "Can anyone suggest routines that are easy to follow using visual rhythm cues?",
      helpful: 10,
      replies: 5,
    },
    {
      author: "Anonymous Student",
      time: "1 hour ago",
      category: "Performance",
      title: "Visual rhythm lane appreciation!",
      content:
        "The falling beat visuals make learning dance much easier than audio-only practice.",
      helpful: 21,
      replies: 12,
    },
  ]);

  const topics = [
    "All",
    "Bharatanatyam",
    "Hip Hop",
    "Mohiniyattam",
    "Practice",
    "Beginner",
    "Performance",
  ];

  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Practice");
  const [content, setContent] = useState("");

  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showReplies, setShowReplies] = useState(false);


const handlePost = () => {
  if (!title.trim() || !content.trim()) {
    alert("Please fill in both title and content.");
    return;
  }

  const newDiscussion = {
    author: "Anonymous User",
    time: "Just now",
    category,
    title,
    content,
    helpful: 0,
    replies: [],
  };

  setDiscussions([newDiscussion, ...discussions]);

  setTitle("");
  setCategory("Practice");
  setContent("");
  setShowModal(false);
};

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch = discussion.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTopic =
      selectedTopic === "All" ||
      discussion.category === selectedTopic;

    return matchesSearch && matchesTopic;
  });

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <h1 className="text-4xl font-bold">
          Anonymous Community Hub
        </h1>

        <p className="text-gray-400 mt-2">
          Ask questions, share experiences and help other dancers anonymously.
        </p>

        {/* Search */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search discussions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1E293B] border border-gray-700 outline-none focus:border-violet-500"
          />
        </div>

        {/* Trending Topics */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">
            🔥 Trending Topics
          </h2>

          <div className="flex flex-wrap gap-3">
            {topics.map((topic, index) => (
              <TopicChip
                key={index}
                name={topic}
                active={selectedTopic === topic}
                onClick={() => setSelectedTopic(topic)}
              />
            ))}
          </div>
        </div>

        {/* Create Button */}
        <div className="mt-8">
          <button
            onClick={() => setShowModal(true)}
            className="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-semibold"
          >
            + Create Discussion
          </button>
        </div>

        {/* Discussion List */}
        <div className="mt-10 space-y-5">
          {filteredDiscussions.map((discussion, index) => (
            <DiscussionCard
  key={index}
  {...discussion}
  onRepliesClick={() => {
    setSelectedDiscussion(discussion);
    setShowReplies(true);
  }}
/>
          ))}
        </div>
      </div>

      {/* Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1E293B] w-full max-w-md rounded-xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-6">
  Create Discussion
</h2>

<input
  type="text"
  placeholder="Discussion title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 mb-4"
/>

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 mb-4"
>
  <option>Practice</option>
  <option>Beginner</option>
  <option>Performance</option>
  <option>Bharatanatyam</option>
  <option>Hip Hop</option>
  <option>Mohiniyattam</option>
</select>

<textarea
  rows="5"
  placeholder="Write your discussion..."
  value={content}
  onChange={(e) => setContent(e.target.value)}
  className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700 mb-6"
/>

<div className="flex justify-end gap-3">
  <button
    onClick={() => setShowModal(false)}
    className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
  >
    Cancel
  </button>

  <button
  onClick={handlePost}
  className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500"
>
  Post
</button>
</div>

          </div>
        </div>
      )}

      <ReplyModal
  open={showReplies}
  onClose={() => setShowReplies(false)}
  title={selectedDiscussion?.title || ""}
  replies={selectedDiscussion?.replies || []}
  onAddReply={(newReply) => {
    const updatedDiscussions = discussions.map((discussion) => {
      if (discussion.title === selectedDiscussion.title) {
        return {
          ...discussion,
          replies: [...discussion.replies, newReply],
        };
      }
      return discussion;
    });

    setDiscussions(updatedDiscussions);

    setSelectedDiscussion({
      ...selectedDiscussion,
      replies: [...selectedDiscussion.replies, newReply],
    });

    setShowReplies(false);
  }}
/>
    </div>
  );
}
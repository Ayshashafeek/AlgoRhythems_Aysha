import { useState } from "react";

export default function ReplyModal({
  open,
  onClose,
  title,
  replies,
  onAddReply,
}) {
  const [text, setText] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1E293B] w-full max-w-lg rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-5">{title}</h2>

        <div className="space-y-3 max-h-72 overflow-y-auto mb-6">
          {replies.map((reply, index) => (
            <div
              key={index}
              className="bg-[#0B1120] rounded-lg p-3"
            >
              <p className="text-violet-400 font-semibold text-sm">
                Anonymous User
              </p>

              <p className="text-gray-300 mt-1">
                {reply}
              </p>
            </div>
          ))}
        </div>

        <textarea
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your reply..."
          className="w-full rounded-lg p-3 bg-[#0B1120] border border-gray-700 mb-5"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (text.trim()) {
                onAddReply(text);
                setText("");
              }
            }}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500"
          >
            Reply
          </button>

        </div>

      </div>
    </div>
  );
}
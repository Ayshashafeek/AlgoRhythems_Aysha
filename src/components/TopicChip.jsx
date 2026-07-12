export default function TopicChip({ name, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full transition text-sm ${
        active
          ? "bg-violet-600 text-white"
          : "bg-[#334155] hover:bg-violet-600"
      }`}
    >
      {name}
    </button>
  );
}
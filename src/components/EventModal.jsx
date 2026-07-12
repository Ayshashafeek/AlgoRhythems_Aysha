import { useNavigate } from "react-router-dom";

export default function EventModal({
  open,
  onClose,
  event,
}) {

    const navigate = useNavigate();

  if (!open || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-[#1E293B] rounded-2xl overflow-hidden w-full max-w-2xl">

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-6">

          <h2 className="text-3xl font-bold">
            {event.title}
          </h2>

          <p className="mt-4 text-gray-300">
            {event.description}
          </p>

          <div className="mt-6 space-y-2">

            <p>📅 <b>Date:</b> {event.date}</p>

            <p>📍 <b>Location:</b> {event.location}</p>

            <p>👤 <b>Organizer:</b> {event.organizer}</p>

            <p>🎭 <b>Category:</b> {event.category}</p>

          </div>

          <div className="flex justify-end gap-3 mt-8">

            <button
              onClick={onClose}
              className="bg-gray-600 px-5 py-2 rounded-lg hover:bg-gray-500"
            >
              Close
            </button>

            <button
  onClick={() =>
    navigate("/register", {
      state: { event },
    })
  }
  className="bg-cyan-600 px-5 py-2 rounded-lg hover:bg-cyan-500"
>
  Register
</button>

          </div>

        </div>

      </div>

    </div>
  );
}
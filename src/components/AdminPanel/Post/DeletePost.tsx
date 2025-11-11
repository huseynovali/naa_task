import { useState } from "react";
import PostService from "../../../service/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../../types/Post";

function DeletePost({ post }: { post: Post }) {
  const [success, setSuccess] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => await PostService.deletePost(post.id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["posts"] });
      setSuccess(true);
      setConfirmOpen(false);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div>
      <button
        onClick={() => setConfirmOpen(true)}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.9999 4.48666C13.9866 4.48666 13.9666 4.48666 13.9466 4.48666C10.4199 4.13333 6.89994 3.99999 3.41328 4.35333L2.05328 4.48666C1.77328 4.51333 1.52661 4.31333 1.49994 4.03333C1.47328 3.75333 1.67328 3.51333 1.94661 3.48666L3.30661 3.35333C6.85328 2.99333 10.4466 3.13333 14.0466 3.48666C14.3199 3.51333 14.5199 3.75999 14.4933 4.03333C14.4733 4.29333 14.2533 4.48666 13.9999 4.48666Z"
            fill="#D82C2C"
          />
          <path
            d="M5.66663 3.81334C5.63997 3.81334 5.6133 3.81334 5.57997 3.80668C5.3133 3.76001 5.12663 3.50001 5.1733 3.23334L5.31997 2.36001C5.42663 1.72001 5.5733 0.833344 7.12663 0.833344H8.8733C10.4333 0.833344 10.58 1.75334 10.68 2.36668L10.8266 3.23334C10.8733 3.50668 10.6866 3.76668 10.42 3.80668C10.1466 3.85334 9.88663 3.66668 9.84663 3.40001L9.69997 2.53334C9.60663 1.95334 9.58663 1.84001 8.87997 1.84001H7.1333C6.42663 1.84001 6.4133 1.93334 6.3133 2.52668L6.15997 3.39334C6.11997 3.64001 5.90663 3.81334 5.66663 3.81334Z"
            fill="#D82C2C"
          />
          <path
            d="M10.14 15.1667H5.85997C3.53331 15.1667 3.43997 13.88 3.36664 12.84L2.93331 6.12666C2.91331 5.85332 3.12664 5.61332 3.39997 5.59332C3.67997 5.57999 3.91331 5.78666 3.93331 6.05999L4.36664 12.7733C4.43997 13.7867 4.46664 14.1667 5.85997 14.1667H10.14C11.54 14.1667 11.5666 13.7867 11.6333 12.7733L12.0666 6.05999C12.0866 5.78666 12.3266 5.57999 12.6 5.59332C12.8733 5.61332 13.0866 5.84666 13.0666 6.12666L12.6333 12.84C12.56 13.88 12.4666 15.1667 10.14 15.1667Z"
            fill="#D82C2C"
          />
          <path
            d="M9.10672 11.5H6.88672C6.61339 11.5 6.38672 11.2733 6.38672 11C6.38672 10.7267 6.61339 10.5 6.88672 10.5H9.10672C9.38005 10.5 9.60672 10.7267 9.60672 11C9.60672 11.2733 9.38005 11.5 9.10672 11.5Z"
            fill="#D82C2C"
          />
          <path
            d="M9.66671 8.83334H6.33337C6.06004 8.83334 5.83337 8.60668 5.83337 8.33334C5.83337 8.06001 6.06004 7.83334 6.33337 7.83334H9.66671C9.94004 7.83334 10.1667 8.06001 10.1667 8.33334C10.1667 8.60668 9.94004 8.83334 9.66671 8.83334Z"
            fill="#D82C2C"
          />
        </svg>
      </button>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-[400px] relative">
            <button
              onClick={() => setConfirmOpen(false)}
              className="absolute top-4 right-4 hover:bg-gray-100 p-1 rounded"
              disabled={mutation.isPending}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12"
                  stroke="#0A0A0A"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 4L12 12"
                  stroke="#0A0A0A"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="scale-150"
                >
                  <path
                    d="M13.9999 4.48666C13.9866 4.48666 13.9666 4.48666 13.9466 4.48666C10.4199 4.13333 6.89994 3.99999 3.41328 4.35333L2.05328 4.48666C1.77328 4.51333 1.52661 4.31333 1.49994 4.03333C1.47328 3.75333 1.67328 3.51333 1.94661 3.48666L3.30661 3.35333C6.85328 2.99333 10.4466 3.13333 14.0466 3.48666C14.3199 3.51333 14.5199 3.75999 14.4933 4.03333C14.4733 4.29333 14.2533 4.48666 13.9999 4.48666Z"
                    fill="#D82C2C"
                  />
                  <path
                    d="M5.66663 3.81334C5.63997 3.81334 5.6133 3.81334 5.57997 3.80668C5.3133 3.76001 5.12663 3.50001 5.1733 3.23334L5.31997 2.36001C5.42663 1.72001 5.5733 0.833344 7.12663 0.833344H8.8733C10.4333 0.833344 10.58 1.75334 10.68 2.36668L10.8266 3.23334C10.8733 3.50668 10.6866 3.76668 10.42 3.80668C10.1466 3.85334 9.88663 3.66668 9.84663 3.40001L9.69997 2.53334C9.60663 1.95334 9.58663 1.84001 8.87997 1.84001H7.1333C6.42663 1.84001 6.4133 1.93334 6.3133 2.52668L6.15997 3.39334C6.11997 3.64001 5.90663 3.81334 5.66663 3.81334Z"
                    fill="#D82C2C"
                  />
                  <path
                    d="M10.14 15.1667H5.85997C3.53331 15.1667 3.43997 13.88 3.36664 12.84L2.93331 6.12666C2.91331 5.85332 3.12664 5.61332 3.39997 5.59332C3.67997 5.57999 3.91331 5.78666 3.93331 6.05999L4.36664 12.7733C4.43997 13.7867 4.46664 14.1667 5.85997 14.1667H10.14C11.54 14.1667 11.5666 13.7867 11.6333 12.7733L12.0666 6.05999C12.0866 5.78666 12.3266 5.57999 12.6 5.59332C12.8733 5.61332 13.0866 5.84666 13.0666 6.12666L12.6333 12.84C12.56 13.88 12.4666 15.1667 10.14 15.1667Z"
                    fill="#D82C2C"
                  />
                  <path
                    d="M9.10672 11.5H6.88672C6.61339 11.5 6.38672 11.2733 6.38672 11C6.38672 10.7267 6.61339 10.5 6.88672 10.5H9.10672C9.38005 10.5 9.60672 10.7267 9.60672 11C9.60672 11.2733 9.38005 11.5 9.10672 11.5Z"
                    fill="#D82C2C"
                  />
                  <path
                    d="M9.66671 8.83334H6.33337C6.06004 8.83334 5.83337 8.60668 5.83337 8.33334C5.83337 8.06001 6.06004 7.83334 6.33337 7.83334H9.66671C9.94004 7.83334 10.1667 8.06001 10.1667 8.33334C10.1667 8.60668 9.94004 8.83334 9.66671 8.83334Z"
                    fill="#D82C2C"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-semibold mb-2">Delete Post</h2>
              <p className="text-gray-600 text-sm mb-6">
                Are you sure you want to delete "
                <strong>
                  {post.title.length > 80
                    ? post.title.substring(0, 80) + "..."
                    : post.title}
                </strong>
                "?
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setConfirmOpen(false)}
                  disabled={mutation.isPending}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  No
                </button>
                <button
                  onClick={handleDelete}
                  disabled={mutation.isPending}
                  className="flex-1 px-4 py-2 bg-[#D82C2C] text-white rounded-lg hover:bg-[#C02828] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {mutation.isPending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Yes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-[400px] text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 mx-auto">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#10B981"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Post Deleted Successfully!
            </h2>
            <button
              onClick={() => {
                setSuccess(false);
              }}
              className="mt-4 px-6 py-2 bg-[#243C7B] text-white rounded-lg hover:bg-[#1a2d5a]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeletePost;

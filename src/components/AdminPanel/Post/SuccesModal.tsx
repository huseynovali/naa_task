interface SuccesModalProps {
  handleSuccessClose: () => void;
  isEditing?: boolean;
}

function SuccesModal({ handleSuccessClose, isEditing }: SuccesModalProps) {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-[400px] relative">
        <button
          onClick={handleSuccessClose}
          className="absolute top-4 right-4 hover:bg-gray-100 p-1 rounded"
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
          <div className="w-20 h-20 bg-[#CEFFE1] rounded-full flex items-center justify-center mb-6">
            <div className="bg-[#00CE4F] w-12 h-12 rounded-full flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.333 20L18.333 25L26.666 15"
                  stroke="#CEFFE1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-lato font-semibold text-[#0A0A0A] mb-2">
            {isEditing
              ? "Post Updated Successfully!"
              : "Post Created Successfully!"}
          </h2>
          <p className="text-sm font-inter text-[#6A7282] mb-6">
            Your news added successfully
          </p>

          <button
            onClick={handleSuccessClose}
            className="w-full bg-[#243C7B] text-white py-3 rounded-lg font-medium hover:bg-[#1a2d5e] transition-colors"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccesModal;
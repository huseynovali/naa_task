import { Link } from "react-router";

function Page404() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#F8F9FC] to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
    
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-[200px] font-bold text-[#243C7B] leading-none">
              404
            </h1>
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              width="300"
              height="300"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="150"
                cy="150"
                r="140"
                stroke="#243C7B"
                strokeWidth="2"
                strokeDasharray="10 10"
                opacity="0.2"
              />
              <path
                d="M150 80L170 140L230 140L180 175L200 235L150 200L100 235L120 175L70 140L130 140L150 80Z"
                fill="#FFD700"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>

    

   
        <h2 className="text-4xl font-bold text-[#243C7B] mb-4">
          Page Not Found
        </h2>
     

    

   
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="px-8 py-3 bg-[#243C7B] text-white rounded-lg hover:bg-[#1a2d5a] transition-colors font-medium flex items-center gap-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33333 14.1667L4.16667 10M4.16667 10L8.33333 5.83333M4.16667 10H15.8333"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 border-2 border-[#243C7B] text-[#243C7B] rounded-lg hover:bg-[#243C7B] hover:text-white transition-colors font-medium"
          >
            Go Back
          </button>
        </div>

   
        <p className="mt-8 text-sm text-[#9CA3AF]">
          If you believe this is an error, please{" "}
          <Link to="/contact" className="text-[#243C7B] hover:underline">
            contact us
          </Link>
        </p>

        
        <div className="absolute top-10 left-10 opacity-10">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" fill="#243C7B" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="75" cy="75" r="75" fill="#3D5DB2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Page404;
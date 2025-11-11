import React, { useState } from "react";
import AddPost from "./Post/AddPost";
import PostList from "./Post/PostList";

interface PostData {
  id: number;
  image: string;
  title: string;
  description: string;
  type: "news" | "announcement";
  sharingTime: string;
  status: "active" | "inactive";
  publishStatus: "publish" | "draft";
  author: string;
}

function Post() {
  const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState("All Posts");
  const [selectedStatus, setSelectedStatus] = useState("All Status");




  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <div className="">
          <h1 className="text-2xl font-lato font-medium">
            News & Announcements
          </h1>
          <p className="text-sm font-lato font-medium text-[#787486] mt-2">
            210 Posts
          </p>
        </div>
        <AddPost />
      </div>

      <div className="filter-post bg-white rounded-xl border border-[#f7f7f7] p-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-[#E0E0E0] rounded-lg hover:bg-gray-50 min-w-[150px] justify-between"
            >
              <span className="text-sm font-lato font-medium ">
                {selectedPost}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform ${
                  isPostDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M13.28 10.5333C13.1533 10.5333 13.0267 10.4867 12.9267 10.3867L8.58001 6.04C8.26001 5.72 7.74001 5.72 7.42001 6.04L3.07335 10.3867C2.88001 10.58 2.56001 10.58 2.36668 10.3867C2.17335 10.1933 2.17335 9.87333 2.36668 9.68L6.71335 5.33333C7.42001 4.62666 8.57335 4.62666 9.28668 5.33333L13.6333 9.68C13.8267 9.87333 13.8267 10.1933 13.6333 10.3867C13.5333 10.48 13.4067 10.5333 13.28 10.5333Z"
                  fill="#787486"
                />
              </svg>
            </button>
            {isPostDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-10 min-w-[150px]">
                <button
                  onClick={() => {
                    setSelectedPost("All Posts");
                    setIsPostDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                >
                  All Posts
                </button>
                <button
                  onClick={() => {
                    setSelectedPost("News");
                    setIsPostDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                >
                  News
                </button>
                <button
                  onClick={() => {
                    setSelectedPost("Announcement");
                    setIsPostDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                >
                  Announcement
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-[#E0E0E0] rounded-lg hover:bg-gray-50 min-w-[150px] justify-between"
            >
              <span className="text-sm font-lato font-medium ">
                {selectedStatus}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform ${
                  isStatusDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M13.28 10.5333C13.1533 10.5333 13.0267 10.4867 12.9267 10.3867L8.58001 6.04C8.26001 5.72 7.74001 5.72 7.42001 6.04L3.07335 10.3867C2.88001 10.58 2.56001 10.58 2.36668 10.3867C2.17335 10.1933 2.17335 9.87333 2.36668 9.68L6.71335 5.33333C7.42001 4.62666 8.57335 4.62666 9.28668 5.33333L13.6333 9.68C13.8267 9.87333 13.8267 10.1933 13.6333 10.3867C13.5333 10.48 13.4067 10.5333 13.28 10.5333Z"
                  fill="#787486"
                />
              </svg>
            </button>
            {isStatusDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-10 min-w-[150px]">
                <button
                  onClick={() => {
                    setSelectedStatus("All Status");
                    setIsStatusDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                >
                  All Status
                </button>
                <button
                  onClick={() => {
                    setSelectedStatus("Active");
                    setIsStatusDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Active
                </button>
                <button
                  onClick={() => {
                    setSelectedStatus("Inactive");
                    setIsStatusDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  Inactive
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <path
                d="M7.33331 13.8333C3.74665 13.8333 0.833313 10.92 0.833313 7.33333C0.833313 3.74666 3.74665 0.833328 7.33331 0.833328C10.92 0.833328 13.8333 3.74666 13.8333 7.33333C13.8333 10.92 10.92 13.8333 7.33331 13.8333ZM7.33331 1.83333C4.29998 1.83333 1.83331 4.29999 1.83331 7.33333C1.83331 10.3667 4.29998 12.8333 7.33331 12.8333C10.3666 12.8333 12.8333 10.3667 12.8333 7.33333C12.8333 4.29999 10.3666 1.83333 7.33331 1.83333Z"
                fill="#787486"
              />
              <path
                d="M13.44 15.1933C13.3867 15.1933 13.3333 15.1867 13.2867 15.18C12.9733 15.14 12.4067 14.9267 12.0867 13.9733C11.92 13.4733 11.98 12.9733 12.2533 12.5933C12.5267 12.2133 12.9867 12 13.5133 12C14.1933 12 14.7267 12.26 14.9667 12.72C15.2067 13.18 15.14 13.7667 14.76 14.3333C14.2867 15.0467 13.7733 15.1933 13.44 15.1933ZM13.04 13.66C13.1533 14.0067 13.3133 14.18 13.42 14.1933C13.5267 14.2067 13.7267 14.08 13.9333 13.78C14.1267 13.4933 14.14 13.2867 14.0933 13.1933C14.0467 13.1 13.86 13 13.5133 13C13.3067 13 13.1533 13.0667 13.0667 13.18C12.9867 13.2933 12.9733 13.4667 13.04 13.66Z"
                fill="#787486"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-lg text-sm text-[#787486] placeholder:text-[#787486] focus:outline-none focus:border-[#243C7B]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <PostList />
    </div>
  );
}

export default Post;

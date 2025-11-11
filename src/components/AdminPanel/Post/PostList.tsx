import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../Pagination";
import PostService from "../../../service/postService";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import type { Post } from "../../../types/Post";

function PostList({postType, postStatus}: {postType?: string; postStatus?: string}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", currentPage, itemsPerPage, postType, postStatus],
    queryFn: () => PostService.getPosts(currentPage, itemsPerPage, postType, postStatus),
  });

  const posts: Post[] = data?.posts || [];
  const paginationData = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const toggleDropdown = (postId: number) => {
    setOpenDropdownId(openDropdownId === postId ? null : postId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#243C7B] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-[#787486] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading posts</p>
      </div>
    );
  }

  return (
    <div className="font-lato">
      <div className="bg-white rounded-xl border border-[#f7f7f7] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#fCFCFC]">
            <tr>
              <th className="text-left border-r border-[#F5F5F5] px-6 py-4 text-[16px] font-semibold text-[#243C7B]">
                Post
              </th>
              <th className="text-left border-r border-[#F5F5F5] px-6 py-4 text-[16px] font-semibold text-[#243C7B]">
                Type
              </th>
              <th className="text-left border-r border-[#F5F5F5] px-6 py-4 text-[16px] font-semibold text-[#243C7B]">
                Sharing time
              </th>
              <th className="text-left border-r border-[#F5F5F5] px-6 py-4 text-[16px] font-semibold text-[#243C7B]">
                Status
              </th>
              <th className="text-left border-r border-[#F5F5F5] px-6 py-4 text-[16px] font-semibold text-[#243C7B]">
                Publish Status
              </th>
              <th className="text-left border-r border-[#F5F5F5] px-6 py-4 text-[16px] font-semibold text-[#243C7B]">
                Author
              </th>
              <th className="text-left px-6 py-4 text-[16px] font-semibold text-[#243C7B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-[#F7F7F7]">
                <td className="px-6 py-4 min-w-[332px]">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-32 h-24 object-cover rounded-lg shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold font-inter break-all text-[16px] text-[#2A2A2A] mb-1">
                        {post.title.length > 40
                          ? post.title.substring(0, 40) + "..."
                          : post.title}
                      </h3>
                      <p className="text-sm font-inter text-[#6A7282]">
                        {post.description.length > 40
                          ? post.description.substring(0, 40) + "..."
                          : post.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-md text-[16px] font-medium ${
                      post.type === "news"
                        ? "bg-[#EBF0FF] text-[#1447E6]"
                        : "bg-[#F3E8FF] text-[#7C3AED]"
                    }`}
                  >
                    {post.type === "news" ? "News" : "Announcement"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-[16px] text-black font-medium">
                    {post.sharingDate}
                  </div>
                  <div className="text-sm text-[#aaa] mt-1">
                    {post.sharingTime}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div
                    className={`${
                      post.status === "active"
                        ? "bg-[#E7FFE1] text-[#145E00]"
                        : "bg-gray-100 text-gray-400"
                    } px-3 py-1 rounded-lg flex items-center gap-2 w-fit`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        post.status === "active"
                          ? "bg-[#145E00]"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    <span className="text-sm capitalize">{post.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(post.id)}
                      className="flex items-center gap-2 px-3 py-1 border border-[#E0E0E0] rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          post.publishStatus === "publish"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span className="text-sm text-[#0A0A0A] capitalize">
                        {post.publishStatus}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform ${
                          openDropdownId === post.id ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M9.96 7.89999C9.89 7.89999 9.82 7.87499 9.765 7.81999L6 4.05499L2.235 7.81999C2.13 7.92499 1.955 7.92499 1.85 7.81999C1.745 7.71499 1.745 7.53999 1.85 7.43499L5.8075 3.47749C5.9125 3.37249 6.0875 3.37249 6.1925 3.47749L10.15 7.43499C10.255 7.53999 10.255 7.71499 10.15 7.81999C10.095 7.87249 10.025 7.89999 9.96 7.89999Z"
                          fill="#787486"
                        />
                      </svg>
                    </button>

                    {openDropdownId === post.id && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-10 min-w-[140px]">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Publish
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          Draft
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#0A0A0A]">{post.author}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <EditPost post={post} />
                    <DeletePost post={post} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={paginationData.currentPage}
        totalPages={paginationData.totalPages}
        itemsPerPage={paginationData.itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}

export default PostList;

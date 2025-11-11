import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../Pagination";
import PostService from "../../../service/postService";

interface PostData {
  id: number;
  image: string;
  title: string;
  description: string;
  type: "news" | "announcement";
  sharingDate: string;
  sharingTime: string;
  status: "active" | "inactive";
  publishStatus: "publish" | "draft";
  author: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

function PostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", currentPage, itemsPerPage],
    queryFn: () => PostService.getPosts(currentPage, itemsPerPage),
  });

  const posts = data?.posts || [];
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
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-[128px] h-[96px] object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-[16px] text-[#2A2A2A] mb-1">
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
                  <div className="text-[16px] text-[#000] font-medium">
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
                  <button className="flex items-center gap-2 px-3 py-1 border border-[#E0E0E0] rounded-lg hover:bg-gray-50">
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
                    >
                      <path
                        d="M9.96 7.89999C9.89 7.89999 9.82 7.87499 9.765 7.81999L6 4.05499L2.235 7.81999C2.13 7.92499 1.955 7.92499 1.85 7.81999C1.745 7.71499 1.745 7.53999 1.85 7.43499L5.8075 3.47749C5.9125 3.37249 6.0875 3.37249 6.1925 3.47749L10.15 7.43499C10.255 7.53999 10.255 7.71499 10.15 7.81999C10.095 7.87249 10.025 7.89999 9.96 7.89999Z"
                        fill="#787486"
                      />
                    </svg>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#0A0A0A]">{post.author}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.05 3.00002L4.20829 10.2417C3.94996 10.5167 3.69996 11.0584 3.64996 11.4334L3.34162 14.1334C3.23329 15.1084 3.93329 15.775 4.89996 15.6084L7.58329 15.15C7.95829 15.0834 8.48329 14.8084 8.74162 14.525L15.5833 7.28335C16.7666 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2333 1.75002 11.05 3.00002Z"
                          stroke="#1447E6"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.90833 4.20825C10.2667 6.50825 12.1333 8.26659 14.45 8.49992"
                          stroke="#1447E6"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.5 18.3333H17.5"
                          stroke="#1447E6"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                          stroke="#D32F2F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.08337 4.14163L7.26671 3.04996C7.40004 2.25829 7.50004 1.66663 8.90837 1.66663H11.0917C12.5 1.66663 12.6084 2.29163 12.7334 3.05829L12.9167 4.14163"
                          stroke="#D32F2F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.7084 7.61667L15.1667 16.0083C15.075 17.3167 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3167 4.83335 16.0083L4.29169 7.61667"
                          stroke="#D32F2F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.60834 13.75H11.3833"
                          stroke="#D32F2F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.91669 10.4167H12.0834"
                          stroke="#D32F2F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
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

import type { Post } from "../types/Post";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

interface GetPostsResponse {
  posts: Post[];
  pagination: PaginationData;
}

const PostService = {
  createPost: async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "Data submitted successfully",
      data: data,
    };
  },

  getPosts: async (
    page: number,
    itemsPerPage: number
  ): Promise<GetPostsResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const allPosts: Post[] = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      coverImage: "https://via.placeholder.com/120x80",
      title: `Milli Aviasiya Akademiyasının təşkilatçılığı ilə həyata keçirilən “Aviatikada Qadınlar Günü” mövzusunda tədbir keçirilib ${
        i + 1
      }`,
      description:
        "Milli Aviasiya Akademiyasının təşkilatçılığı ilə həyata keçirilən “Aviatikada Qadınlar Günü” mövzusunda tədbir keçirilib",
      type: i % 2 === 0 ? "news" : "announcement",
      sharingDate: "06/11/2026",
      sharingTime: "10:19 AM",
      status: i % 3 === 0 ? "inactive" : "active",
      publishStatus: i % 4 === 0 ? "draft" : "publish",
      author: "snovruzlu",
      slug: "https://naa.edu.az/",
      language: "az",
    }));

    const totalItems = allPosts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const posts = allPosts.slice(startIndex, endIndex);

    return {
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        itemsPerPage,
        totalItems,
      },
    };
  },
  updatePost: async (postId: number, data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "Post updated successfully",
      data: data,
    };
  },
  deletePost: async (postId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Post deleted successfully",
    };
  },
};

export default PostService;

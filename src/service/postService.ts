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
    itemsPerPage: number,
    postType?: string,
    postStatus?: string
  ): Promise<GetPostsResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const allPosts: Post[] = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      coverImage: `https://picsum.photos/id/${i + 1}/200/300`,
      title: `Milli Aviasiya Akademiyasının təşkilatçılığı ilə həyata keçirilən "Aviatikada Qadınlar Günü" mövzusunda tədbir keçirilib ${
        i + 1
      }`,
      description:
        "Milli Aviasiya Akademiyasının təşkilatçılığı ilə həyata keçirilən mövzusunda tədbir keçirilib",
      type: i % 2 === 0 ? "news" : "announcement",
      sharingDate: "06/11/2026",
      sharingTime: "10:19 AM",
      status: i % 3 === 0 ? "inactive" : "active",
      publishStatus: i % 4 === 0 ? "draft" : "publish",
      author: "user" + (i + 1),
      slug: "https://naa.edu.az/",
      language: "az",
    }));

 
    let filteredPosts = allPosts;

    if (postType && postType !== "allposts" && postType !== "all") {
      filteredPosts = filteredPosts.filter((post) => post.type === postType);
    }

    if (postStatus && postStatus !== "allstatus" && postStatus !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post.status === postStatus
      );
    }

    const totalItems = filteredPosts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const posts = filteredPosts.slice(startIndex, endIndex);

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
      postId: postId,
      data: data,
    };
  },

  deletePost: async (postId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Post deleted successfully",
      postId: postId,
    };
  },
};

export default PostService;

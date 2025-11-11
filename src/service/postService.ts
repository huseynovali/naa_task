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

interface GetPostsResponse {
  posts: PostData[];
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
    // Fake API call - 1 saniye bekle
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fake data - 100 post generate et
    const allPosts: PostData[] = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      image: "https://via.placeholder.com/120x80",
      title: `Milli Aviasiya Akademiyasının təşkilatçılığı ${i + 1}...`,
      description:
        "Milli Aviasiya Akademiyasının təşkilatçılığı ilə həyata k...",
      type: i % 2 === 0 ? "news" : "announcement",
      sharingDate: "06/11/2026",
      sharingTime: "10:19 AM",
      status: i % 3 === 0 ? "inactive" : "active",
      publishStatus: i % 4 === 0 ? "draft" : "publish",
      author: "snovruzlu",
    }));

    // Pagination hesabla
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

    // Gerçek API call üçün:
    // return fetch(
    //   `http://localhost:3000/posts?_page=${page}&_limit=${itemsPerPage}`
    // ).then((res) => res.json());
  },
};

export default PostService;
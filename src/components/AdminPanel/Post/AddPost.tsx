import { useState, useEffect } from "react";
import aze_flag from "../../../assets/aze.png";
import uk_flag from "../../../assets/uk.png";
import AddForm from "./AddForm";
import AddFormImages from "./AddFormImages";
import { useMutation } from "@tanstack/react-query";
import SuccesModal from "./SuccesModal";
import PostService from "../../../service/postService";

interface FormData {
  title: string;
  slug: string;
  category: "news" | "announcement";
  coverImage: FileList | null;
  content: string;
}

interface GalleryFormData {
  images: FileList | null;
}

interface CompleteFormData {
  step1: FormData | null;
  step2: GalleryFormData | null;
  language: "az" | "en";
}

function AddPost({
  post,
  isEditing,
  setIsEditing,
}: {
  post?: any;
  isEditing?: boolean;
  setIsEditing?: (val: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"az" | "en">("az");
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<CompleteFormData>({
    step1: null,
    step2: null,
    language: "az",
  });

 
  useEffect(() => {
    if (isEditing && post) {
      setIsOpen(true);
      setSelectedLang(post.language || "az");
      setFormData({
        step1: {
          title: post.title || "",
          slug: post.slug || "",
          category: post.type || "news",
          coverImage: null,
          content: post.description || "",
        },
        step2: null,
        language: post.language || "az",
      });
    }
  }, [isEditing, post]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (isEditing && post?.id) {
        return PostService.updatePost(post.id, data);
      }
      return PostService.createPost(data);
    },
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const handleStep1Submit = (data: FormData) => {
    setFormData((prev) => ({
      ...prev,
      step1: data,
      language: selectedLang,
    }));
    setStep(2);
  };

  const handleStep2Submit = async (data: GalleryFormData) => {
    const completeData = {
      ...formData,
      step2: data,
      language: selectedLang,
    };
    console.log("Complete Form Data:", completeData);

    try {
      const formDataToSend = new FormData();

      if (completeData.step1) {
        formDataToSend.append("title", completeData.step1.title);
        formDataToSend.append("slug", completeData.step1.slug);
        formDataToSend.append("category", completeData.step1.category);
        formDataToSend.append("content", completeData.step1.content);

        if (
          completeData.step1.coverImage &&
          completeData.step1.coverImage.length > 0
        ) {
          formDataToSend.append("coverImage", completeData.step1.coverImage[0]);
        }
      }

      if (completeData.step2?.images) {
        Array.from(completeData.step2.images).forEach((image) => {
          formDataToSend.append(`galleryImages`, image);
        });
      }

      formDataToSend.append("language", completeData.language);

      mutation.mutate(formDataToSend);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep(1);
    setFormData({ step1: null, step2: null, language: "az" });
    setSuccess(false);
    if (setIsEditing) {
      setIsEditing(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccess(false);
    setIsOpen(false);
    setStep(1);
    setFormData({ step1: null, step2: null, language: "az" });
    if (setIsEditing) {
      setIsEditing(false);
    }
  };

  return (
    <div className="font-lato">
      {!isEditing && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#243C7B] text-white px-4 py-2 flex items-center gap-2 rounded-[30px] text-sm font-lato font-medium "
        >
          <div className="p-2 rounded-full bg-[#3D5DB2] h-6 w-6 flex items-center justify-center">
            +
          </div>
          Add News or Announcement
        </button>
      )}

      {isOpen && !success && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-[728px] max-h-[90vh] overflow-y-auto relative">
            <div className="w-full flex justify-end mb-4">
              <button
                onClick={handleClose}
                className="hover:bg-gray-100 p-1 rounded"
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
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setSelectedLang("az")}
                disabled={mutation.isPending}
                className={`flex items-center justify-center gap-2 px-4 py-[3px] cursor-pointer border rounded-[20px] ${
                  selectedLang === "az"
                    ? "border-[#243C7B] bg-[#243C7B] text-white"
                    : "border-[#E0E0E0]"
                } ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <img
                  src={aze_flag}
                  className="w-[18px] h-[18px]"
                  alt="Azerbaijan Flag"
                />
                <span className="text-sm">AZ</span>
              </button>
              <button
                onClick={() => setSelectedLang("en")}
                disabled={mutation.isPending}
                className={`flex items-center justify-center gap-2 px-4 py-[3px] cursor-pointer border rounded-[20px] ${
                  selectedLang === "en"
                    ? "border-[#243C7B] bg-[#243C7B] text-white"
                    : "border-[#E0E0E0]"
                } ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <img
                  src={uk_flag}
                  className="w-[18px] h-[18px]"
                  alt="UK Flag"
                />
                <span className="text-sm">EN</span>
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[28px] font-medium">
                {isEditing ? "Edit" : "Create"} News / Announcement
              </h2>
              <span className="text-[28px] font-medium">{step}/2</span>
            </div>

            <div className="step_line flex gap-1 mb-6">
              <div
                className={`w-1/2 h-2 rounded-full ${
                  step >= 1 ? "bg-[#243C7B]" : "bg-[#E0E7FA]"
                }`}
              ></div>
              <div
                className={`w-1/2 h-2 rounded-full ${
                  step >= 2 ? "bg-[#243C7B]" : "bg-[#E0E7FA]"
                }`}
              ></div>
            </div>

      
            {mutation.isPending && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10 rounded-lg">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 border-4 border-[#243C7B] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-[#787486] font-medium">
                    {isEditing ? "Updating..." : "Submitting..."}
                  </p>
                </div>
              </div>
            )}

            {step === 1 ? (
              <AddForm
                step={step}
                setStep={setStep}
                setIsOpen={setIsOpen}
                onSubmit={handleStep1Submit}
                initialData={formData.step1}
                isEditing={isEditing}
                existingCoverImage={post?.coverImage}
              />
            ) : (
              <AddFormImages
                step={step}
                setStep={setStep}
                setIsOpen={setIsOpen}
                onSubmit={handleStep2Submit}
                isEditing={isEditing}
                existingGalleryImages={post?.galleryImages}
              />
            )}
          </div>
        </div>
      )}

      {success && (
        <SuccesModal
          handleSuccessClose={handleSuccessClose}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default AddPost;

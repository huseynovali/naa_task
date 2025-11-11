import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import type { AddFormProps, FormData } from "../../../types/Post";

function AddForm({ onSubmit, initialData, existingCoverImage }: AddFormProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    existingCoverImage || null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<FormData>({
    defaultValues: initialData || {
      category: "news",
      content: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("slug", initialData.slug);
      setValue("category", initialData.category);
      setValue("content", initialData.content);
    }
  }, [initialData, setValue]);

  const selectedCategory = watch("category");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewImages([imageUrl]);
      setSelectedFileName(file.name);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFileName("");
  };

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#787486] mb-2">
          Title
        </label>
        <textarea
          {...register("title", {
            required: "Title is required",
          })}
          placeholder="Enter title"
          rows={3}
          className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg text-sm focus:outline-none focus:border-[#243C7B] resize-none"
        />
        {errors.title && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.title.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#787486] mb-2">
          URL
        </label>
        <input
          {...register("slug", {
            required: "URL is required",
          })}
          type="text"
          placeholder="naa.edu.az/"
          className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg text-sm focus:outline-none focus:border-[#243C7B]"
        />
        {errors.slug && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.slug.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#787486] mb-2">
          Category
        </label>
        <div className="flex gap-3">
          <label
            className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer ${
              selectedCategory === "news"
                ? "border-[#1447E6] bg-[#EBF0FF] text-[#1447E6]"
                : "border-[#E0E0E0] text-[#787486]"
            }`}
          >
            <input
              {...register("category")}
              type="radio"
              value="news"
              className="hidden"
            />
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1666 14.1667H2.49992C2.05789 14.1667 1.63397 13.9911 1.32141 13.6785C1.00885 13.366 0.833252 12.942 0.833252 12.5V2.50001C0.833252 2.05798 1.00885 1.63406 1.32141 1.3215C1.63397 1.00894 2.05789 0.833344 2.49992 0.833344H10.8333C11.2753 0.833344 11.6992 1.00894 12.0118 1.3215C12.3243 1.63406 12.4999 2.05798 12.4999 2.50001V3.33334M14.1666 14.1667C13.7246 14.1667 13.3006 13.9911 12.9881 13.6785C12.6755 13.366 12.4999 12.942 12.4999 12.5V3.33334M14.1666 14.1667C14.6086 14.1667 15.0325 13.9911 15.3451 13.6785C15.6577 13.366 15.8333 12.942 15.8333 12.5V5.00001C15.8333 4.55798 15.6577 4.13406 15.3451 3.8215C15.0325 3.50894 14.6086 3.33334 14.1666 3.33334H12.4999M9.16659 0.833344H5.83325M4.16659 10.8333H9.16659M4.16659 4.16668H9.16659V7.50001H4.16659V4.16668Z"
                stroke={selectedCategory === "news" ? "#1447E6" : "#787486"}
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">News</span>
          </label>

          <label
            className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer ${
              selectedCategory === "announcement"
                ? "border-[#1447E6] bg-[#EBF0FF] text-[#1447E6]"
                : "border-[#E0E0E0] text-[#787486]"
            }`}
          >
            <input
              {...register("category")}
              type="radio"
              value="announcement"
              className="hidden"
            />
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49948 3.23504V14.3667C7.49924 14.7121 7.37711 15.0463 7.15461 15.3105C6.9321 15.5747 6.62351 15.7518 6.28319 15.8108C5.94287 15.8698 5.59266 15.8067 5.29426 15.6328C4.99585 15.4589 4.76841 15.1852 4.65198 14.86L2.86282 9.73504M2.86282 9.73504C2.1555 9.4343 1.57381 8.89926 1.21618 8.21893C0.858547 7.5386 0.746948 6.75561 0.900264 6.00246C1.05358 5.2493 1.4624 4.57225 2.05753 4.08587C2.65266 3.5995 3.39755 3.33367 4.16615 3.33337H5.69282C9.10948 3.33337 12.047 2.30504 13.3328 0.833374V12.5C12.047 11.0284 9.11032 10 5.69282 10H4.16615C3.71835 10.0007 3.27503 9.91001 2.86282 9.73504ZM13.3328 9.16671C13.9959 9.16671 14.6317 8.90332 15.1006 8.43447C15.5694 7.96563 15.8328 7.32975 15.8328 6.66671C15.8328 6.00367 15.5694 5.36778 15.1006 4.89894C14.6317 4.4301 13.9959 4.16671 13.3328 4.16671"
                stroke={
                  selectedCategory === "announcement" ? "#1447E6" : "#787486"
                }
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">Announcement</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#787486] mb-2">
          Cover Image
        </label>

        <div className="border-2 border-dashed border-[#E0E0E0] rounded-lg p-8 text-center">
          <input
            {...register("coverImage")}
            type="file"
            accept="image/*"
            className="hidden"
            id="coverImage"
            onChange={handleImageChange}
          />
          <label
            htmlFor="coverImage"
            className="cursor-pointer flex justify-center items-center gap-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5001 18.9583H7.50008C2.97508 18.9583 1.04175 17.025 1.04175 12.5V7.49999C1.04175 2.97499 2.97508 1.04166 7.50008 1.04166H12.5001C17.0251 1.04166 18.9584 2.97499 18.9584 7.49999V12.5C18.9584 17.025 17.0251 18.9583 12.5001 18.9583ZM7.50008 2.29166C3.65841 2.29166 2.29175 3.65832 2.29175 7.49999V12.5C2.29175 16.3417 3.65841 17.7083 7.50008 17.7083H12.5001C16.3417 17.7083 17.7084 16.3417 17.7084 12.5V7.49999C17.7084 3.65832 16.3417 2.29166 12.5001 2.29166H7.50008Z"
                fill="#787486"
              />
              <path
                d="M7.49992 8.95833C6.23325 8.95833 5.20825 7.93333 5.20825 6.66667C5.20825 5.4 6.23325 4.375 7.49992 4.375C8.76659 4.375 9.79159 5.4 9.79159 6.66667C9.79159 7.93333 8.76659 8.95833 7.49992 8.95833ZM7.49992 5.625C6.92492 5.625 6.45825 6.09167 6.45825 6.66667C6.45825 7.24167 6.92492 7.70833 7.49992 7.70833C8.07492 7.70833 8.54159 7.24167 8.54159 6.66667C8.54159 6.09167 8.07492 5.625 7.49992 5.625Z"
                fill="#787486"
              />
              <path
                d="M2.22497 16.4167C2.02497 16.4167 1.82497 16.3167 1.70831 16.1417C1.51664 15.8583 1.59164 15.4667 1.88331 15.275L5.99164 12.5167C6.89164 11.9083 8.13331 11.9833 8.94997 12.675L9.22497 12.9167C9.64164 13.275 10.35 13.275 10.7583 12.9167L14.225 9.94167C15.1083 9.18334 16.5 9.18334 17.3916 9.94167L18.75 11.1083C19.0083 11.3333 19.0416 11.725 18.8166 11.9917C18.5916 12.25 18.2 12.2833 17.9333 12.0583L16.575 10.8917C16.1583 10.5333 15.45 10.5333 15.0333 10.8917L11.5666 13.8667C10.6833 14.625 9.29164 14.625 8.39997 13.8667L8.12497 13.625C7.74164 13.3 7.10831 13.2667 6.68331 13.5583L2.57497 16.3167C2.46664 16.3833 2.34164 16.4167 2.22497 16.4167Z"
                fill="#787486"
              />
            </svg>

            <span className="text-sm text-[#243C7B]">Upload Cover Image</span>
          </label>
        </div>
        {previewImages.length > 0 && (
          <div className="mt-4 ">
            <img
              src={previewImages[0]}
              alt="Cover preview"
              className="w-[128px] h-[92px] object-cover rounded-lg border border-[#E0E0E0]"
            />
            <button
              type="button"
              onClick={() => removeImage(0)}
              className="border border-[#3DB23F] bg-white text-[#3DB23F] mt-2 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 hover:bg-gray-100 transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5001 3.36499C10.4901 3.36499 10.4751 3.36499 10.4601 3.36499C7.81508 3.09999 5.17508 2.99999 2.56008 3.26499L1.54008 3.36499C1.33008 3.38499 1.14508 3.23499 1.12508 3.02499C1.10508 2.81499 1.25508 2.63499 1.46008 2.61499L2.48008 2.51499C5.14008 2.24499 7.83508 2.34999 10.5351 2.61499C10.7401 2.63499 10.8901 2.81999 10.8701 3.02499C10.8551 3.21999 10.6901 3.36499 10.5001 3.36499Z"
                  fill="#3DB23F"
                />
                <path
                  d="M4.24988 2.86C4.22988 2.86 4.20988 2.86 4.18488 2.855C3.98488 2.82 3.84488 2.625 3.87988 2.425L3.98988 1.77C4.06988 1.29 4.17988 0.625 5.34488 0.625H6.65488C7.82488 0.625 7.93488 1.315 8.00988 1.775L8.11988 2.425C8.15488 2.63 8.01488 2.825 7.81488 2.855C7.60988 2.89 7.41488 2.75 7.38488 2.55L7.27488 1.9C7.20488 1.465 7.18988 1.38 6.65988 1.38H5.34988C4.81988 1.38 4.80988 1.45 4.73488 1.895L4.61988 2.545C4.58988 2.73 4.42988 2.86 4.24988 2.86Z"
                  fill="#3DB23F"
                />
                <path
                  d="M7.60495 11.375H4.39495C2.64995 11.375 2.57995 10.41 2.52495 9.63004L2.19995 4.59504C2.18495 4.39004 2.34495 4.21004 2.54995 4.19504C2.75995 4.18504 2.93495 4.34004 2.94995 4.54504L3.27495 9.58004C3.32995 10.34 3.34995 10.625 4.39495 10.625H7.60495C8.65495 10.625 8.67495 10.34 8.72495 9.58004L9.04995 4.54504C9.06495 4.34004 9.24495 4.18504 9.44995 4.19504C9.65495 4.21004 9.81495 4.38504 9.79995 4.59504L9.47495 9.63004C9.41995 10.41 9.34995 11.375 7.60495 11.375Z"
                  fill="#3DB23F"
                />
                <path
                  d="M6.83004 8.625H5.16504C4.96004 8.625 4.79004 8.455 4.79004 8.25C4.79004 8.045 4.96004 7.875 5.16504 7.875H6.83004C7.03504 7.875 7.20504 8.045 7.20504 8.25C7.20504 8.455 7.03504 8.625 6.83004 8.625Z"
                  fill="#3DB23F"
                />
                <path
                  d="M7.25 6.625H4.75C4.545 6.625 4.375 6.455 4.375 6.25C4.375 6.045 4.545 5.875 4.75 5.875H7.25C7.455 5.875 7.625 6.045 7.625 6.25C7.625 6.455 7.455 6.625 7.25 6.625Z"
                  fill="#3DB23F"
                />
              </svg>
              <span className="truncate max-w-[150px]">
                {selectedFileName || "Delete cover"}
              </span>
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#787486] mb-2">
          HTML Content
        </label>
        <p className="text-xs text-[#787486] mb-2">
          Use the toolbar to format your text with bold, italic, headers, lists,
          and more.
        </p>
        <Controller
          name="content"
          control={control}
          rules={{ required: "Content is required" }}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              modules={modules}
              formats={formats}
              placeholder="Enter your content here..."
              className="bg-white rounded-lg"
              style={{ height: "300px", marginBottom: "50px" }}
            />
          )}
        />
        {errors.content && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.content.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#243C7B] text-white py-3 rounded-lg font-medium hover:bg-[#1a2d5e] transition-colors"
      >
        Next
      </button>
    </form>
  );
}

export default AddForm;

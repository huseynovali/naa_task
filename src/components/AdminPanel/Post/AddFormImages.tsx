import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface AddFormImagesProps {
  step: number;
  setStep: (step: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (data: GalleryFormData) => void;
}

interface GalleryFormData {
  images: FileList | null;
}

function AddFormImages({ setStep, onSubmit }: AddFormImagesProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GalleryFormData>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const imagePreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...imagePreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: GalleryFormData) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    setStep(1);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border border-[#F7F7F7] p-5 rounded-xl">
        <label className="block text-sm font-medium text-[#787486] mb-2">
          Gallery Images
        </label>
        <p className="text-xs text-[#787486] mb-4">JPG/PNG, multiple allowed</p>

        <div className="border-2 border-dashed border-[#E0E0E0] rounded-lg p-12 text-center">
          <input
            {...register("images")}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className="hidden"
            id="galleryImages"
            onChange={handleImageChange}
          />
          <label
            htmlFor="galleryImages"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 4.5V22.5"
                stroke="#787486"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.5 12L18 4.5L10.5 12"
                stroke="#787486"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M31.5 22.5V28.5C31.5 29.2956 31.1839 30.0587 30.6213 30.6213C30.0587 31.1839 29.2956 31.5 28.5 31.5H7.5C6.70435 31.5 5.94129 31.1839 5.37868 30.6213C4.81607 30.0587 4.5 29.2956 4.5 28.5V22.5"
                stroke="#787486"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="text-sm text-[#787486]">Upload an Image</span>
          </label>
        </div>

        {previewImages.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {previewImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-[#E0E0E0]"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
                      fill="#D82C2C"
                    />
                    <path
                      d="M4.24988 2.86C4.22988 2.86 4.20988 2.86 4.18488 2.855C3.98488 2.82 3.84488 2.625 3.87988 2.425L3.98988 1.77C4.06988 1.29 4.17988 0.625 5.34488 0.625H6.65488C7.82488 0.625 7.93488 1.315 8.00988 1.775L8.11988 2.425C8.15488 2.63 8.01488 2.825 7.81488 2.855C7.60988 2.89 7.41488 2.75 7.38488 2.55L7.27488 1.9C7.20488 1.465 7.18988 1.38 6.65988 1.38H5.34988C4.81988 1.38 4.80988 1.45 4.73488 1.895L4.61988 2.545C4.58988 2.73 4.42988 2.86 4.24988 2.86Z"
                      fill="#D82C2C"
                    />
                    <path
                      d="M7.60495 11.375H4.39495C2.64995 11.375 2.57995 10.41 2.52495 9.63004L2.19995 4.59504C2.18495 4.39004 2.34495 4.21004 2.54995 4.19504C2.75995 4.18504 2.93495 4.34004 2.94995 4.54504L3.27495 9.58004C3.32995 10.34 3.34995 10.625 4.39495 10.625H7.60495C8.65495 10.625 8.67495 10.34 8.72495 9.58004L9.04995 4.54504C9.06495 4.34004 9.24495 4.18504 9.44995 4.19504C9.65495 4.21004 9.81495 4.38504 9.79995 4.59504L9.47495 9.63004C9.41995 10.41 9.34995 11.375 7.60495 11.375Z"
                      fill="#D82C2C"
                    />
                    <path
                      d="M6.83004 8.625H5.16504C4.96004 8.625 4.79004 8.455 4.79004 8.25C4.79004 8.045 4.96004 7.875 5.16504 7.875H6.83004C7.03504 7.875 7.20504 8.045 7.20504 8.25C7.20504 8.455 7.03504 8.625 6.83004 8.625Z"
                      fill="#D82C2C"
                    />
                    <path
                      d="M7.25 6.625H4.75C4.545 6.625 4.375 6.455 4.375 6.25C4.375 6.045 4.545 5.875 4.75 5.875H7.25C7.455 5.875 7.625 6.045 7.625 6.25C7.625 6.455 7.455 6.625 7.25 6.625Z"
                      fill="#D82C2C"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center py-6 px-8 border border-[#F7F7F7] rounded-2xl">
        <button
          type="button"
          onClick={handleCancel}
          className="text-[#787486] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#243C7B] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#1a2d5e] transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default AddFormImages;

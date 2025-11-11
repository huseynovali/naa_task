export interface Step1FormData {
  title: string;
  slug: string;
  category: "news" | "announcement";
  coverImage: FileList | null;
  content: string;
}

export type FormData = Step1FormData;

export interface GalleryFormData {
  images: FileList | null;
}

export interface CompleteFormData {
  step1: Step1FormData | null;
  step2: GalleryFormData | null;
  language: "az" | "en";
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  type: "news" | "announcement";
  coverImage?: string;
  description: string;
  content?: string;
  language: "az" | "en";
  galleryImages?: string[];
  sharingDate: string;
  sharingTime: string;
  status: "active" | "inactive";
  publishStatus: "publish" | "draft";
  author: string;
}

export interface AddFormProps {
  step: number;
  setStep: (step: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (data: FormData) => void;
  initialData?: FormData | null;
  isEditing?: boolean;
  existingCoverImage?: string;
}

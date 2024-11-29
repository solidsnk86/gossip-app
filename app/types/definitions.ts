type ProfileHeaderProps = {
  id: string | number;
  fullName: string;
  user: string;
  avatar: string;
  city: string;
  country: string;
  createdAt: string | number;
  content?: string | number | any;
  editable?: boolean;
  onEdit?: (id: string | number) => void;
  onSave?: (content: string) => void;
};

type FormProps = {
  ip?: string;
  city?: string;
  country?: string;
  userName: string;
  fullName?: string;
  avatar?: string;
  slug?: string;
  onRefresh: () => Promise<any>;
};

type PostsProps = {
  id: string | number;
  avatar_url: string;
  user_metadata: string;
  city: string;
  created_at: string | number | Date;
  message: string;
  url: string;
  editable: boolean;
  onDelete?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onSave?: (id: string | number, message: string, edited: boolean) => void;
  edited: boolean;
  slug?: string;
};

type HomePostsProps = {
  id: string | number;
  avatar_url: string;
  user_metadata: string;
  city: string;
  created_at: string | number | Date;
  message: string;
  url: string;
};

type EditButtonProps = {
  className?: string;
  onEdit: () => void;
  title: string;
};

type DeleteButtonProps = {
  id: string | number;
  title: string;
  onDelete: () => void;
};

type ResponseButtonProps = {
  user: string;
  onResponse?: () => void;
};

interface ShareProps {
  message: string;
  url?: string | URL;
}

export type {
  ProfileHeaderProps,
  FormProps,
  HomePostsProps,
  PostsProps,
  EditButtonProps,
  DeleteButtonProps,
  ResponseButtonProps,
  ShareProps,
};

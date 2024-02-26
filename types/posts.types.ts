export interface IPostProperties {
  title: string
  content?: string
  isPublished?: boolean
  author: `${string}-${string}-${string}-${string}-${string}`;
  images?: IImageProperties[]
}

interface IImageProperties {
  publicID: string;
  privateKey: string;
}

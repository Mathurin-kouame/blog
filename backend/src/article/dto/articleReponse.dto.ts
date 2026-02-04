export class ArticleReponseDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  body: string;

  author: {
    id: string;
    email: string;
  };

  tags: {
    id: string;
    name: string;
  }[];

  favoritesCount: number;
  favorited: boolean;

  createdAt: Date;
  updatedAt?: Date;
}

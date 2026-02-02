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

  tags: string[];

  createdAt: Date;
  updatedAt?: Date;
}

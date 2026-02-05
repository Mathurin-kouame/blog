import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { In, Repository } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '../user/user.entity';
import { ArticleReponseDto } from './dto/articleReponse.dto';
import { FavoriteResponse } from 'src/types/typeArticle';

@Injectable()
export class ArticleService {
  [x: string]: any;
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,

    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  //fonction pour formater notre reponse lors de l'envoie
  private formatArticle(article: ArticleEntity, userId?: string) {
    const favorited = userId
      ? article.likedBy?.some((user) => user.id === userId)
      : false;
    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      description: article.description,
      body: article.body,

      author: {
        id: article.author.id,
        email: article.author.email,
      },
      tags: article.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),

      favoritesCount: article.favoritesCount,
      favorited,

      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  }

  //Methode de creation d'article
  async create(
    createArticleDto: CreateArticleDto,
    author: UserEntity,
  ): Promise<ArticleReponseDto> {
    const { title, description, body, tags } = createArticleDto;

    //Générer le slug
    // const slug = slugify((title) {
    //   lower: true,
    //   strict: true,
    // });

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    let slug = baseSlug;
    let count: number = 1;

    //verifier si le slug existe déjà
    while (
      await this.articleRepository.findOne({
        where: { slug },
      })
    ) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    //Générer les tags
    let tagEntities: TagEntity[] = [];

    if (tags?.length) {
      const existingTags = await this.tagRepository.find({
        where: { name: In(tags) },
      });

      const existingNames = existingTags.map((tag) => tag.name);

      const newTags = tags
        .filter((name) => !existingNames.includes(name))
        .map((name) => this.tagRepository.create({ name }));

      const saveNewTags = await this.tagRepository.save(newTags);

      tagEntities = [...existingTags, ...saveNewTags];
    }

    //créer l'article
    const article = this.articleRepository.create({
      title,
      slug,
      description,
      body,
      author,
      tags: tagEntities,
    });

    //sauvegarder
    const savedArticle = await this.articleRepository.save(article);
    //on ne renvoie plus l’entité brute
    return this.formatArticle(savedArticle);
  }

  async findBySlug(slug: string, userId?: string) {
    const article = await this.articleRepository.findOne({
      where: { slug },
      relations: ['author', 'tags', 'likedBy'],
    });

    if (!article) {
      throw new NotFoundException(`Article avec "${slug}" introuvable`);
    }
    return this.formatArticle(article, userId);
  }

  async getAll() {
    const articles = await this.articleRepository.find({
      relations: ['author', 'tags'],
    });
    return articles.map((article) => this.formatArticle(article));
  }

  // Ajouter favorites
  async addFavorite(
    articleId: string,
    userId: string,
  ): Promise<FavoriteResponse> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['likedBy'],
    });
    if (!article) {
      throw new NotFoundException('article non trouvé !');
    }
    //verifier si dedjà en favoris
    const alreadyLiked = article.likedBy.some((user) => user.id === userId);

    if (alreadyLiked) {
      //Retirer les favoris
      article.likedBy = article.likedBy.filter((user) => user.id !== userId);
      article.favoritesCount -= 1;
    } else {
      // Ajouter les favoris
      const user = { id: userId } as UserEntity;
      article.likedBy.push(user);
      article.favoritesCount += 1;
    }

    await this.articleRepository.save(article);
    return {
      favorited: !alreadyLiked,
      favoritesCount: article.favoritesCount,
    };
  }

  //retirer les favoris
  async removeFavorite(
    articleId: string,
    userId: string,
  ): Promise<FavoriteResponse> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['likedBy'],
    });

    if (!article) {
      throw new NotFoundException('article non trouvé !');
    }

    //verifier si dedjà en favoris
    const alreadyLiked = article.likedBy.some((u) => u.id === userId);

    if (!alreadyLiked) {
      return {
        favorited: false,
        favoritesCount: article.favoritesCount,
      };
    }

    //Retirer les favoris
    article.likedBy = article.likedBy.filter((u) => u.id !== userId);
    article.favoritesCount -= 1;

    await this.articleRepository.save(article);

    return {
      favorited: false,
      favoritesCount: article.favoritesCount,
    };
  }
}

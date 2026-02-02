import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { In, Repository } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,

    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    author: UserEntity,
  ): Promise<ArticleEntity> {
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
    return await this.articleRepository.save(article);
  }
  async getAll(): Promise<ArticleEntity[]> {
    return await this.articleRepository.find({ relations: ['author', 'tags'] });
  }
}

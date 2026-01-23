import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleSevice: ArticleService) {}

  @Get()
  async getAll() {
    const allTags = await this.articleSevice.getAll(); // nous demanons à recevoir tous les sms ici
    const tags = allTags.map((tag) => tag.id);
    return { tags };
  }
}

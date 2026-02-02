import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @User() user: UserEntity,
  ) {
    const article = await this.articleService.create(createArticleDto, user);
    return { article };
  }
  @Get()
  async getAllArticles() {
    const articles = await this.articleService.getAll(); // nous demanons à recevoir tous les sms ici
    return { articles };
  }
}

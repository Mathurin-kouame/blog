import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { FavoriteResponse } from 'src/types/typeArticle';

@Controller('articles')
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

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/favorite')
  async addFavorite(@Param('id') articleId: string, @User() user: string) {
    const addFavorites = await this.articleService.addFavorite(articleId, user);
    return addFavorites;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/favorite')
  async removeFavorite(
    @Param('id') articleId: string,
    @User('id') userId: string,
  ): Promise<FavoriteResponse> {
    const removeFavorites = await this.articleService.removeFavorite(
      articleId,
      userId,
    );
    return removeFavorites;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':slug')
  async getArticleBySlug(
    @Param('slug') slug: string,
    @User('id') userId: string,
  ) {
    const article = await this.articleService.findBySlug(slug, userId);
    return { article };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteArticle(
    @Param('id') articleId: string,
    @User('id') userI: string,
    @Query('confirm') confirm?: string,
  ) {
    const isConfirmed = confirm === 'true';
    const deleteArticle = await this.articleService.deleteArticle(
      articleId,
      userI,
      isConfirmed,
    );
    return deleteArticle;
  }

  @Get()
  async getAllArticles() {
    const articles = await this.articleService.getAll(); // nous demanons à recevoir tous les articles ici
    return { articles };
  }
}

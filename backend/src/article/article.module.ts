import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { ArticleController } from './article.controller';
import { TagEntity } from 'src/tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, TagEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}

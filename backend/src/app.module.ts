import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagController } from './tag/tag.controller';
import { TagModule } from './tag/tag.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // entities: [__dirname + '/**/*.entity.{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TagModule,
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController, TagController, ArticleController],
  providers: [AppService, UserService],
})
export class AppModule {}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArticlesFinal1769186547078 implements MigrationInterface {
    name = 'AddArticlesFinal1769186547078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "body" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "content" text NOT NULL`);
    }

}

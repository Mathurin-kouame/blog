import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1769129224901 implements MigrationInterface {
 name = 'Init1769129224901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "authorId" uuid NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles_tags_tags" ("articlesId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_bee9492f5e2157b6dc27fd510bd" PRIMARY KEY ("articlesId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0adb8d108330d74e4a7f7d29de" ON "articles_tags_tags" ("articlesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dcd523dc6473a35e6cb0cbf9f2" ON "articles_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" ADD CONSTRAINT "FK_0adb8d108330d74e4a7f7d29de2" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" ADD CONSTRAINT "FK_dcd523dc6473a35e6cb0cbf9f2d" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" DROP CONSTRAINT "FK_dcd523dc6473a35e6cb0cbf9f2d"`);
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" DROP CONSTRAINT "FK_0adb8d108330d74e4a7f7d29de2"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcd523dc6473a35e6cb0cbf9f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0adb8d108330d74e4a7f7d29de"`);
        await queryRunner.query(`DROP TABLE "articles_tags_tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1631078191074 implements MigrationInterface {
    name = 'CreateUsers1631078191074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "admin" boolean NOT NULL, "name" character varying(50) NOT NULL, "surname" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "cref" character varying(13) NOT NULL, "street" character varying(100) NOT NULL, "number" character varying(6) NOT NULL, "district" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "uf" character varying(2) NOT NULL, "complement" character varying(50) NOT NULL, "cep" character varying(8) NOT NULL, "phone" character varying(11) NOT NULL, "photo_url" character varying(300) NOT NULL, "nickname" character varying(40) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

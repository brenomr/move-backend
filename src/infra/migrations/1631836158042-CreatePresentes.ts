import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePresentes1631836158042 implements MigrationInterface {
    name = 'CreatePresentes1631836158042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "presences" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "presencedate" TIMESTAMP NOT NULL, "courseId" uuid, CONSTRAINT "PK_954405226c89821ea470763df3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "presences" ADD CONSTRAINT "FK_ce4713f591e7b377c0eb2243a34" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "presences" DROP CONSTRAINT "FK_ce4713f591e7b377c0eb2243a34"`);
        await queryRunner.query(`DROP TABLE "presences"`);
    }

}

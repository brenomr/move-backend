import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAssessments1631491267096 implements MigrationInterface {
    name = 'CreateAssessments1631491267096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assessment_model" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(100) NOT NULL, "attached_url" character varying(300) NOT NULL, "personalId" uuid, "studentId" uuid, CONSTRAINT "PK_a4ef8e8e075588fe16c4c6209da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assessment_model" ADD CONSTRAINT "FK_f6710c1c56d7fd778127d371509" FOREIGN KEY ("personalId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assessment_model" ADD CONSTRAINT "FK_6e9580e2b569288efc19b9e890f" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assessment_model" DROP CONSTRAINT "FK_6e9580e2b569288efc19b9e890f"`);
        await queryRunner.query(`ALTER TABLE "assessment_model" DROP CONSTRAINT "FK_f6710c1c56d7fd778127d371509"`);
        await queryRunner.query(`DROP TABLE "assessment_model"`);
    }

}

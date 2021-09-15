import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCourses1631670605753 implements MigrationInterface {
    name = 'CreateCourses1631670605753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assessments" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(100) NOT NULL, "attached_url" character varying(300) NOT NULL, "personalId" uuid, "studentId" uuid, CONSTRAINT "PK_a3442bd80a00e9111cefca57f6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "description" character varying(300) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "studentId" uuid, "trainingId" uuid, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_aefbd6b1c5936ef9c7dc359efbe" FOREIGN KEY ("personalId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_0bedc1cc7c7242bf78246fbf4bd" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_d657bbfbcafe6e7ab90555de4bc" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_47df1a0e95bc6b8158e39f62015" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_47df1a0e95bc6b8158e39f62015"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_d657bbfbcafe6e7ab90555de4bc"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_0bedc1cc7c7242bf78246fbf4bd"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_aefbd6b1c5936ef9c7dc359efbe"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "assessments"`);
    }

}

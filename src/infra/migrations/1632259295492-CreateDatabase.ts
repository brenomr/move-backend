import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1632259295492 implements MigrationInterface {
    name = 'CreateDatabase1632259295492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "presences" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "presencedate" TIMESTAMP NOT NULL, "courseId" uuid, CONSTRAINT "PK_954405226c89821ea470763df3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "whois" character varying(10) NOT NULL, "name" character varying(50) NOT NULL, "surname" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "cref" character varying(13) NOT NULL, "street" character varying(100) NOT NULL, "number" character varying(6) NOT NULL, "district" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "uf" character varying(2) NOT NULL, "complement" character varying(50) NOT NULL, "cep" character varying(8) NOT NULL, "phone" character varying(11) NOT NULL, "photo_url" character varying(300) NOT NULL, "nickname" character varying(40) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assessments" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(100) NOT NULL, "attached_url" character varying(300) NOT NULL, "personalId" uuid, "studentId" uuid, CONSTRAINT "PK_a3442bd80a00e9111cefca57f6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "whois" character varying(10) NOT NULL, "name" character varying(50) NOT NULL, "surname" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "street" character varying(100) NOT NULL, "number" character varying(6) NOT NULL, "district" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "uf" character varying(2) NOT NULL, "complement" character varying(50) NOT NULL, "cep" character varying(8) NOT NULL, "phone" character varying(11) NOT NULL, "photo_url" character varying(300) NOT NULL, "nickname" character varying(40) NOT NULL, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "description" character varying(300) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "studentId" uuid, "trainingId" uuid, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trainings" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "title" character varying(50) NOT NULL, "description" character varying(300) NOT NULL, "personalId" uuid, CONSTRAINT "PK_b67237502b175163e47dc85018d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercises" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "repetition" character varying(3) NOT NULL, "serie" character varying(3) NOT NULL, "breaktime" character varying(3) NOT NULL, "personalId" uuid, "activityId" uuid, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activities" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "name" character varying(50) NOT NULL, "category" character varying(50) NOT NULL, "image_url" character varying(300) NOT NULL, "userId" uuid, CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students_personals_users" ("studentsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_3fe635d0ec51a887dc4a4c3af09" PRIMARY KEY ("studentsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f206b1987542d51f48315baa40" ON "students_personals_users" ("studentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_439509db67f428f0c5fe4b8316" ON "students_personals_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "trainings_exercises_exercises" ("trainingsId" uuid NOT NULL, "exercisesId" uuid NOT NULL, CONSTRAINT "PK_295a2ac1c03e27573a1acc2e996" PRIMARY KEY ("trainingsId", "exercisesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_62acf8e581ce8711c9e5c305df" ON "trainings_exercises_exercises" ("trainingsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e09f366e86b7097d083ed2ee9c" ON "trainings_exercises_exercises" ("exercisesId") `);
        await queryRunner.query(`ALTER TABLE "presences" ADD CONSTRAINT "FK_ce4713f591e7b377c0eb2243a34" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_aefbd6b1c5936ef9c7dc359efbe" FOREIGN KEY ("personalId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_0bedc1cc7c7242bf78246fbf4bd" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_d657bbfbcafe6e7ab90555de4bc" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_47df1a0e95bc6b8158e39f62015" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_b4371e4f9029f7b097e0e189543" FOREIGN KEY ("personalId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_8811b7348a8651508a3c698e642" FOREIGN KEY ("personalId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_79004ea2e0a7d299202eb422202" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_5a2cfe6f705df945b20c1b22c71" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_personals_users" ADD CONSTRAINT "FK_f206b1987542d51f48315baa401" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "students_personals_users" ADD CONSTRAINT "FK_439509db67f428f0c5fe4b83169" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trainings_exercises_exercises" ADD CONSTRAINT "FK_62acf8e581ce8711c9e5c305df3" FOREIGN KEY ("trainingsId") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "trainings_exercises_exercises" ADD CONSTRAINT "FK_e09f366e86b7097d083ed2ee9cd" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings_exercises_exercises" DROP CONSTRAINT "FK_e09f366e86b7097d083ed2ee9cd"`);
        await queryRunner.query(`ALTER TABLE "trainings_exercises_exercises" DROP CONSTRAINT "FK_62acf8e581ce8711c9e5c305df3"`);
        await queryRunner.query(`ALTER TABLE "students_personals_users" DROP CONSTRAINT "FK_439509db67f428f0c5fe4b83169"`);
        await queryRunner.query(`ALTER TABLE "students_personals_users" DROP CONSTRAINT "FK_f206b1987542d51f48315baa401"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_5a2cfe6f705df945b20c1b22c71"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_79004ea2e0a7d299202eb422202"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_8811b7348a8651508a3c698e642"`);
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_b4371e4f9029f7b097e0e189543"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_47df1a0e95bc6b8158e39f62015"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_d657bbfbcafe6e7ab90555de4bc"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_0bedc1cc7c7242bf78246fbf4bd"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_aefbd6b1c5936ef9c7dc359efbe"`);
        await queryRunner.query(`ALTER TABLE "presences" DROP CONSTRAINT "FK_ce4713f591e7b377c0eb2243a34"`);
        await queryRunner.query(`DROP INDEX "IDX_e09f366e86b7097d083ed2ee9c"`);
        await queryRunner.query(`DROP INDEX "IDX_62acf8e581ce8711c9e5c305df"`);
        await queryRunner.query(`DROP TABLE "trainings_exercises_exercises"`);
        await queryRunner.query(`DROP INDEX "IDX_439509db67f428f0c5fe4b8316"`);
        await queryRunner.query(`DROP INDEX "IDX_f206b1987542d51f48315baa40"`);
        await queryRunner.query(`DROP TABLE "students_personals_users"`);
        await queryRunner.query(`DROP TABLE "activities"`);
        await queryRunner.query(`DROP TABLE "exercises"`);
        await queryRunner.query(`DROP TABLE "trainings"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "assessments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "presences"`);
    }

}

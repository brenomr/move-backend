import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStudents1631466521416 implements MigrationInterface {
    name = 'CreateStudents1631466521416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "name" character varying(50) NOT NULL, "surname" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "street" character varying(100) NOT NULL, "number" character varying(6) NOT NULL, "district" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "uf" character varying(2) NOT NULL, "complement" character varying(50) NOT NULL, "cep" character varying(8) NOT NULL, "phone" character varying(11) NOT NULL, "photo_url" character varying(300) NOT NULL, "nickname" character varying(40) NOT NULL, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students_personals_users" ("studentsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_3fe635d0ec51a887dc4a4c3af09" PRIMARY KEY ("studentsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f206b1987542d51f48315baa40" ON "students_personals_users" ("studentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_439509db67f428f0c5fe4b8316" ON "students_personals_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "students_personals_users" ADD CONSTRAINT "FK_f206b1987542d51f48315baa401" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "students_personals_users" ADD CONSTRAINT "FK_439509db67f428f0c5fe4b83169" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students_personals_users" DROP CONSTRAINT "FK_439509db67f428f0c5fe4b83169"`);
        await queryRunner.query(`ALTER TABLE "students_personals_users" DROP CONSTRAINT "FK_f206b1987542d51f48315baa401"`);
        await queryRunner.query(`DROP INDEX "IDX_439509db67f428f0c5fe4b8316"`);
        await queryRunner.query(`DROP INDEX "IDX_f206b1987542d51f48315baa40"`);
        await queryRunner.query(`DROP TABLE "students_personals_users"`);
        await queryRunner.query(`DROP TABLE "students"`);
    }

}

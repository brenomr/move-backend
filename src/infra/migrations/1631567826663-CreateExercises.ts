import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateExercises1631567826663 implements MigrationInterface {
    name = 'CreateExercises1631567826663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exercises" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "repetition" character varying(3) NOT NULL, "serie" character varying(3) NOT NULL, "breaktime" character varying(3) NOT NULL, "personalId" uuid, "activityId" uuid, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_8811b7348a8651508a3c698e642" FOREIGN KEY ("personalId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_79004ea2e0a7d299202eb422202" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_79004ea2e0a7d299202eb422202"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_8811b7348a8651508a3c698e642"`);
        await queryRunner.query(`DROP TABLE "exercises"`);
    }

}

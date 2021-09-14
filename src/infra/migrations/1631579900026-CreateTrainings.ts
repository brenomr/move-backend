import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTrainings1631579900026 implements MigrationInterface {
    name = 'CreateTrainings1631579900026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trainings" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "title" character varying(50) NOT NULL, "description" character varying(300) NOT NULL, "personalId" uuid, CONSTRAINT "PK_b67237502b175163e47dc85018d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trainings_exercises_exercises" ("trainingsId" uuid NOT NULL, "exercisesId" uuid NOT NULL, CONSTRAINT "PK_295a2ac1c03e27573a1acc2e996" PRIMARY KEY ("trainingsId", "exercisesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_62acf8e581ce8711c9e5c305df" ON "trainings_exercises_exercises" ("trainingsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e09f366e86b7097d083ed2ee9c" ON "trainings_exercises_exercises" ("exercisesId") `);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_b4371e4f9029f7b097e0e189543" FOREIGN KEY ("personalId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trainings_exercises_exercises" ADD CONSTRAINT "FK_62acf8e581ce8711c9e5c305df3" FOREIGN KEY ("trainingsId") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "trainings_exercises_exercises" ADD CONSTRAINT "FK_e09f366e86b7097d083ed2ee9cd" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings_exercises_exercises" DROP CONSTRAINT "FK_e09f366e86b7097d083ed2ee9cd"`);
        await queryRunner.query(`ALTER TABLE "trainings_exercises_exercises" DROP CONSTRAINT "FK_62acf8e581ce8711c9e5c305df3"`);
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_b4371e4f9029f7b097e0e189543"`);
        await queryRunner.query(`DROP INDEX "IDX_e09f366e86b7097d083ed2ee9c"`);
        await queryRunner.query(`DROP INDEX "IDX_62acf8e581ce8711c9e5c305df"`);
        await queryRunner.query(`DROP TABLE "trainings_exercises_exercises"`);
        await queryRunner.query(`DROP TABLE "trainings"`);
    }

}

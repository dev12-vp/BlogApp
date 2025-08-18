import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1755499370864 implements MigrationInterface {
    name = 'InitialSchema1755499370864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog"."users" ADD "workEmail" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog"."users" ADD CONSTRAINT "UQ_76fe3bc77b4056c6546718b1c30" UNIQUE ("workEmail")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog"."users" DROP CONSTRAINT "UQ_76fe3bc77b4056c6546718b1c30"`);
        await queryRunner.query(`ALTER TABLE "blog"."users" DROP COLUMN "workEmail"`);
    }

}

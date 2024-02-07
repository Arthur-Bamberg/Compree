import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovendoUsuarioIdDoProduto1707322172912 implements MigrationInterface {
    name = 'RemovendoUsuarioIdDoProduto1707322172912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ADD "usuario_id" character varying(100) NOT NULL`);
    }

}

import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableUser1688009903228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'user',
            new TableColumn({
                name: 'username',
                type: 'varchar',
                length: '225'
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" DROP COLUMN "username"`,
        )
    }

}

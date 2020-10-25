import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addUserIdToOrphanages1603329882057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orphanages',
      new TableColumn({
        name: 'user_id',
        type: 'integer',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'orphanages',
      new TableForeignKey({
        name: 'OrphanageUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orphanages', 'OrphanageUser');
    await queryRunner.dropColumn('orphanages', 'user_id');
  }
}

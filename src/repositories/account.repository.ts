import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Account, AccountRelations, Supplier } from '../models';
import { HasonedbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { SupplierRepository } from './supplier.repository';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
  > {

  public readonly supplier: BelongsToAccessor<Supplier, typeof Account.prototype.id>;

  constructor(
    @inject('datasources.hasonedb') dataSource: HasonedbDataSource, @repository.getter('SupplierRepository') protected supplierRepositoryGetter: Getter<SupplierRepository>,
  ) {
    super(Account, dataSource);
    this.supplier = this.createBelongsToAccessorFor('supplier', supplierRepositoryGetter);
  }
}

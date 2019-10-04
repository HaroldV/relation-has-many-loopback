import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Supplier, SupplierRelations, Account } from '../models';
import { HasonedbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { AccountRepository } from './account.repository';

export class SupplierRepository extends DefaultCrudRepository<
  Supplier,
  typeof Supplier.prototype.id,
  SupplierRelations
  > {

  accounts: HasManyRepositoryFactory<Account, typeof Supplier.prototype.id>;

  constructor(
    @inject('datasources.hasonedb') dataSource: HasonedbDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(Supplier, dataSource);
    this.accounts = this.createHasManyRepositoryFactoryFor('accounts', accountRepositoryGetter);

  }
}

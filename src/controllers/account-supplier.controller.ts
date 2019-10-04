import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
} from '@loopback/rest';
import {
  Account,
  Supplier,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountSupplierController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/supplier', {
    responses: {
      '200': {
        description: 'Supplier belonging to Account',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Supplier } },
          },
        },
      },
    },
  })
  async getSupplier(
    @param.path.number('id') id: typeof Account.prototype.id,
  ): Promise<Supplier> {
    return await this.accountRepository.supplier(id);
  }
}

import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  AnyObject,
  relation,
} from '@loopback/repository';
import {
  del,
  get,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Supplier,
  Account,
} from '../models';
import { SupplierRepository } from '../repositories';

export class SupplierAccountController {
  constructor(
    @repository(SupplierRepository) protected supplierRepository: SupplierRepository,
  ) { }

  @get('/suppliers/{id}/accounts', {
    responses: {
      '200': {
        description: 'Array of Account\'s belonging to Supplier',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Account } },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Account>,
  ): Promise<AnyObject[]> {
    return await this.supplierRepository.find({ include: [{ relation: 'account' }] });

  }

  @post('/suppliers/{id}/accounts', {
    responses: {
      '200': {
        description: 'Supplier model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Account } } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Supplier.prototype.id,
    @requestBody() account: Account,
  ): Promise<Account> {
    return await this.supplierRepository.accounts(id).create(account);
  }

  @patch('/suppliers/{id}/accounts', {
    responses: {
      '200': {
        description: 'Supplier.Account PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody() account: Partial<Account>,
    @param.query.object('where', getWhereSchemaFor(Account)) where?: Where<Account>,
  ): Promise<Count> {
    return await this.supplierRepository.accounts(id).patch(account, where);
  }

  @del('/suppliers/{id}/accounts', {
    responses: {
      '200': {
        description: 'Supplier.Account DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Account)) where?: Where<Account>,
  ): Promise<Count> {
    return await this.supplierRepository.accounts(id).delete(where);
  }
}

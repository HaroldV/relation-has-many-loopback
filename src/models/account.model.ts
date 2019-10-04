import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Supplier } from './supplier.model';

@model({ settings: { strict: false } })
export class Account extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  accountManager: string;

  @belongsTo(() => Supplier)
  supplierId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;

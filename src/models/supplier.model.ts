import { Entity, model, property, hasMany } from '@loopback/repository';
import { Account } from './account.model';

@model({ settings: { strict: false } })
export class Supplier extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Account)
  accounts?: Account[];
  // Define well-known properties here

  constructor(data?: Partial<Supplier>) {
    super(data);
  }
}

export interface SupplierRelations {
  // describe navigational properties here
}

export type SupplierWithRelations = Supplier & SupplierRelations;

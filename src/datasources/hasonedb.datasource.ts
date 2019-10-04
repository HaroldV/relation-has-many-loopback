import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './hasonedb.datasource.json';

export class HasonedbDataSource extends juggler.DataSource {
  static dataSourceName = 'hasonedb';

  constructor(
    @inject('datasources.config.hasonedb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { UserModel } from '../shared/modules/user/user.entity.js';


@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) {}

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      // this.config.get('DB_HOST'),
      // this.config.get('DB_PORT'),
      // this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }


  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $SAlT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

    const user = await UserModel.create({
      name: 'ewfwefwfew',
      email: 'test@email.ru',
      avatar: 'keks.jpg',
      password: '123456',
      userType: "pro"
    });
    const user1 = await UserModel.create({
      name: ' poluectov',
      email: 'test1@email.ru',
      avatar: 'keks1.jpg',
      password: '123456',
      userType: "обычный"
    });

    console.log(user);
    console.log(user1);

  }
}

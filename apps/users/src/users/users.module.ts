// local
import { UserModelDefinition } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SALT_ROUNDS } from '../app.constants';

// libs
import { LoggerService } from '@iogru/logger';
import { HealthModule } from '@iogru/health';
import { BcryptModule } from '@iogru/bcrypt';

// global
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BcryptModule.register({ saltRounds: SALT_ROUNDS }),
    MongooseModule.forFeature([UserModelDefinition]),
    HealthModule.register({ logger: LoggerService }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

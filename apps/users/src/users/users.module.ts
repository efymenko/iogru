import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptModule } from 'libs/bcrypt/src';
import { SALT_ROUNDS } from '../app.constants';
import { UserModelDefinition } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    BcryptModule.register({ saltRounds: SALT_ROUNDS }),
    MongooseModule.forFeature([UserModelDefinition]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

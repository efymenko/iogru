import { LoggerService } from '@iogru/logger';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BcryptService } from 'libs/bcrypt/src';
import {
  AlreadyExistsRpcException,
  InternalRpcException,
  NotFoundRpcException,
  UnauthenticatedRpcException,
} from 'libs/protos/src/grpc-errors';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { Id } from './types/id';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { User, UserDocument, UserLean } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private readonly logger: LoggerService,
    private readonly bcrypt: BcryptService,
  ) {
    logger.setMetadata({ class: UsersService.name });
  }

  async create(dto: CreateUserDto) {
    const { username, password, ...payload } = dto;

    const filter: FilterQuery<UserDocument> = { username };

    let doc;

    try {
      doc = await this.model.findOne(filter);
    } catch (err) {
      this.logger.error(err.message);
      throw new InternalRpcException();
    }

    if (doc) {
      throw new AlreadyExistsRpcException();
    }

    try {
      const hashed = this.bcrypt.hashSync(password);
      doc = await this.model.create({ username, password: hashed, ...payload });
    } catch (err) {
      this.logger.error(err.message);
      throw new InternalRpcException();
    }

    this.logger.info(`User ${username} has been created.`);

    const user: UserLean = doc.toObject({ getters: true });

    return user;
  }

  async update(id: Id, toUpdate: Partial<User>) {
    const update: UpdateQuery<UserDocument> = { $set: { ...toUpdate } };

    const options: QueryOptions<UserDocument> = { new: true };

    let doc;

    try {
      doc = await this.model.findByIdAndUpdate(id, update, options);
    } catch (err) {
      this.logger.error(err.message);
      throw new InternalRpcException();
    }

    if (!doc) {
      throw new NotFoundRpcException();
    }

    const user: UserLean = doc.toObject({ getters: true });

    return user;
  }

  async delete(id: Id) {
    const toUpdate = { isDeleted: true };

    return this.update(id, toUpdate);
  }

  async destroy(id: Id) {
    let doc;

    try {
      doc = await this.model.findByIdAndDelete(id);
    } catch (err) {
      this.logger.error(err.message);
      throw new InternalRpcException();
    }

    if (!doc) {
      throw new NotFoundRpcException();
    }

    this.logger.info(`User ${doc.username} has been deleted.`);

    const user: UserLean = doc.toObject({ getters: true });

    return user;
  }

  async findById(id: Id) {
    let doc;

    try {
      doc = await this.model.findById(id);
    } catch (err) {
      this.logger.error(err.message);
      throw new InternalRpcException();
    }

    if (!doc) {
      throw new NotFoundRpcException();
    }

    const user: UserLean = doc.toObject({ getters: true });

    return user;
  }

  async findByUsername(username: string) {
    const filter: FilterQuery<UserDocument> = { username };

    let doc;

    try {
      doc = await this.model.findOne(filter);
    } catch (err) {
      this.logger.error(err.message);
      throw new InternalRpcException();
    }

    if (!doc) {
      throw new NotFoundRpcException();
    }

    const user: UserLean = doc.toObject({ getters: true });

    return user;
  }

  async login(dto: LoginUserDto) {
    const { username, password } = dto;

    const user = await this.findByUsername(username);

    const ok = this.bcrypt.compareSync(password, user.password);

    if (!ok) {
      this.logger.info(`Failed login attempt from user ${username}`);
      throw new UnauthenticatedRpcException();
    }

    this.logger.info(`User ${username} logged in.`);

    return user;
  }
}

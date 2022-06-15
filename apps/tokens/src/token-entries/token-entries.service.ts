import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, UpdateQuery } from 'mongoose';
import { TokenEntryNotFoundException } from './exceptions/token-entry.exceptions';
import {
  Footprint,
  TokenEntry,
  TokenEntryDocument,
  TokenEntryLean,
} from './token-entry.schema';
import { CreateEntry } from './types/create-entry.interface';

@Injectable()
export class TokenEntriesService {
  constructor(
    @InjectModel(TokenEntry.name)
    private readonly model: Model<TokenEntryDocument>,
  ) {}

  public async create(dto: CreateEntry) {
    const doc = await this.model.create(dto);

    const { id }: TokenEntryLean = doc.toObject({ getters: true });

    return id;
  }

  public async findById(id: string) {
    const doc = await this.model.findById(id);

    if (!doc) {
      throw new TokenEntryNotFoundException();
    }

    const entry: TokenEntryLean = doc.toObject({ getters: true });

    return entry;
  }

  public async update(id: string, toUpdate: Partial<TokenEntry>) {
    const update: UpdateQuery<TokenEntryDocument> = { ...toUpdate };

    const options: QueryOptions = { new: true };

    const doc = await this.model.findByIdAndUpdate(id, update, options);

    if (!doc) {
      throw new TokenEntryNotFoundException();
    }

    const entry: TokenEntryLean = doc.toObject({ getters: true });

    return entry;
  }

  public async revoke(id: string) {
    const toUpdate: Partial<TokenEntry> = { isRevoked: true };

    return this.update(id, toUpdate);
  }

  public async leave(id: string, footprint: Footprint) {
    const toUpdate: Partial<TokenEntry> = { footprint };

    return this.update(id, toUpdate);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenEntriesService } from './token-entries.service';
import { TokenEntryModelDefinition } from './token-entry.schema';

@Module({
  providers: [TokenEntriesService],
  exports: [TokenEntriesService],
  imports: [MongooseModule.forFeature([TokenEntryModelDefinition])],
})
export class TokenEntriesModule {}

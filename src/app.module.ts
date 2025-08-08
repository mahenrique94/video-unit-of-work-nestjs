import { Module } from '@nestjs/common';

import { DomainsModule } from './domains/domains.module';

@Module({
  imports: [DomainsModule],
})
export class AppModule {}

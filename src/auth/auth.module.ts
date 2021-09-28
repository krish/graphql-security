import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthConfiguration } from './auth.configuration';
import { CongnitoAuthGuard } from './congito.guard';
import { JwtStrategy } from './jwt.stretegy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthConfiguration, JwtStrategy, CongnitoAuthGuard],
})
export class AuthModule {}

import { ConsoleLogger, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfiguration } from './auth.configuration';
import { User } from './user.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _authConfig: AuthConfiguration) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${_authConfig.authority}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //audience: _authConfig.clientId,
      issuer: _authConfig.authority,
      algorithms: ['RS256'],
    });
  }
  async validate(payload: any) {
    const user: User = new User(payload.username, payload['cognito:groups']);
    return user;
  }
}

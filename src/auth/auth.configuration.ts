import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfiguration {
  public userPoolId: string = process.env.AWS_COGNITO_USERPOOL_ID;
  public clientId: string = process.env.AWS_COGNITO_CLIENTID;
  public region: string = process.env.AWS_COGNITO_REGION;
  public authority = `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USERPOOL_ID}`;
}

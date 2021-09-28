import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  username: string;
  @Field(() => [String])
  roles: string[];

  constructor(username: string, roles: string[]) {
    (this.username = username), (this.roles = roles);
  }
}

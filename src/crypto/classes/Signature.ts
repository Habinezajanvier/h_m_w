import {
  Field, ObjectType,
  ID, InputType
} from "type-graphql";


@InputType()
@ObjectType()
export class Signature {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  algo: string;

  @Field({ nullable: true })
  created: string;

  @Field({ nullable: true })
  controller: string;

  @Field({ nullable: true })
  proof: string;

}

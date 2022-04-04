import {
  Field, ObjectType,
  ID
} from "type-graphql";
import * as scalars from "graphql-scalars";



// @ObjectType({ description: "Chokidr Response Document Format" })
export default class DidResolutionDocument {
  // @Field((type) => ID, { description: "ID" })
  id?: string;

  // @Field({ nullable: true })
  controller?: string;

  // @Field({ nullable: true })
  lastDocumentId?: string;

  // @Field((type) => scalars.GraphQLJSON, { nullable: true })
  didResolutionMetadata: any;

  // @Field((type) => scalars.GraphQLJSON, { nullable: true })
  didDocument: any;

  // @Field((type) => scalars.GraphQLJSON, { nullable: true })
  didDocumentMetadata: any;

}

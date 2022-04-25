import IProof from "../interface/IProof";
import {
	Field,
	ID,
	ObjectType,
	Int,
	Float,
	InputType,
	InputTypeOptions,
} from "type-graphql";

@ObjectType()
export class Proof implements IProof {

	@Field({ nullable: true })
	type: string;

	@Field({ nullable: true })
	created: string;

	@Field({ nullable: true })
	creator: string;

	@Field(type => String, { nullable: true })
	signer: string;

	@Field({ nullable: true })
	nonce: string;

	@Field({ nullable: true })
	verificationMethod: string;

	@Field({ nullable: true })
	proofPurpose: string;

	@Field({ nullable: true })
	proofValue: string;

	@Field({ nullable: true })
	evidence: string;
	@Field(type=>[Number],{ nullable: true })
	revealed: number[];


}

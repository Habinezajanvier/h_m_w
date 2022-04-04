import {
	Field,
	ID,
	ObjectType,
	Int,
	Float
} from "type-graphql";
import { IDocument } from "../interface/IDocument";
import { Proof } from "./Proof";
import * as scalars from "graphql-scalars";
import { AggrigatedProof } from "../interface/AggrigatedProof";
import IProof from "../interface/IProof";


export enum DocumentType {
	SELFISSUE = "SelfIssueDocument",
	MULTISIGNER = "MultiSignerDocument"
}



/**
 *
 */
@ObjectType({ description: "Document Defination when creating a new Document" })
export class Document implements IDocument {
	// @Field((type) => ID)
	id: string;

	// @Field({ nullable: true, description: "DID of the document or the holder" })
	did: string;

	 
	masterdid: string;

	 
	workerdid: string;

	 
	peerdid: string;

	
	type: DocumentType;

	
	subType: string[];

	 
	issuer: string;

	
	aud: string[];

	 
	odid: string;

	 
	controller?: string;

	 
	created?: string;

	 
	mode?: string;

	 
	updated?: string;

	 
	links?: string;

	 
	parentCapability?: string;

	 
	action: string;


	
	graph?: {
		root: string;
		tree: string[]
	};

	 
	content?: string[];

	 
	data?: any;

	 
	node?: string;


	 
	audPayload?: any;

	 
	assertionMethod?: any

	 
	keyAgreement?: any

	 
	verificationMethod?: any

	 
	proof: IProof[];

	 
	aggrigatedSignature: AggrigatedProof[];
}

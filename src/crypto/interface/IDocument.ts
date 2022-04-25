import { DocumentType } from '../classes/Document';
import { IAggrigateProof } from './IAggrigateProof';
import IProof from './IProof'

type Ceveat = [
	{
		type: string;
		uri: string;
	}
];

export interface IDocument  {

	id: string // nanoid of the current document
	did: string // did of the document
	masterdid: string // Chokidr DocumentManager Controller DID 
	workerdid: string // Chokidr DocumentManager Controller DID 
	peerdid: string // Signer Peer DID
	type: DocumentType; // Document Type. Refer to the documentation for more information
	odid: string; // organisation DID if any
	aud?: string[];
	audPayload?: string[];
	mode?: string; // mode of the document // "attached" "detached"
	controller?: string; // Controller // DID in base64 format
	created?: string; // timestamp of the time the document was created
	updated?: string // timestamp of the last document value updated
	links?: string; // PreviousLink of the document

	data?: any
	node?: string
	parentCapability?: string // Capability Chain
	action: string
	ceveat?: Ceveat

	payload?: string[]; // Document Block IBLock Format
	graph?: {
		root: string
		tree: string[]
	};  // payload If an

	proof: IProof[]; // Document Signature
	aggrigatedSignature: IAggrigateProof[]
}




// This file is auto-generated by @hey-api/openapi-ts

export type CreateItem = {
	name: string;
};

export type ErrorResponseModel = {
	errors: Array<{
		[key: string]: string;
	}>;
};

export type HttpValidationError = {
	detail?: Array<ValidationError>;
};

export type Item = {
	id?: number | null;
	name: string;
};

export type ValidationError = {
	loc: Array<string | number>;
	msg: string;
	type: string;
};

export type ReadRootData = {
	body?: never;
	path?: never;
	query?: never;
	url: '/';
};

export type ReadRootResponses = {
	/**
	 * Successful Response
	 */
	200: unknown;
};

export type GetItemsData = {
	body?: never;
	path?: never;
	query?: never;
	url: '/items';
};

export type GetItemsErrors = {
	/**
	 * Bad Request
	 */
	400: ErrorResponseModel;
};

export type GetItemsError = GetItemsErrors[keyof GetItemsErrors];

export type GetItemsResponses = {
	/**
	 * Successful Response
	 */
	200: unknown;
};

export type InsertItemData = {
	body: CreateItem;
	path?: never;
	query?: never;
	url: '/items';
};

export type InsertItemErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type InsertItemError = InsertItemErrors[keyof InsertItemErrors];

export type InsertItemResponses = {
	/**
	 * Successful Response
	 */
	200: unknown;
};

export type ReadItemData = {
	body?: never;
	path: {
		item_id: number;
	};
	query?: never;
	url: '/items/{item_id}';
};

export type ReadItemErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type ReadItemError = ReadItemErrors[keyof ReadItemErrors];

export type ReadItemResponses = {
	/**
	 * Successful Response
	 */
	200: Item;
};

export type ReadItemResponse = ReadItemResponses[keyof ReadItemResponses];

export type ClientOptions = {
	baseUrl: 'http://localhost:8000' | (string & {});
};

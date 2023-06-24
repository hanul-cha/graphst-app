import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum AuthRole {
  /** 개발자(전체권한) */
  AdminDeveloper = 'ADMIN_DEVELOPER',
  /** 일반사용자 */
  AdminUser = 'ADMIN_USER'
}

export type Mutation = {
  __typename?: 'Mutation';
  deleteUser?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  signIn?: Maybe<Scalars['String']>;
  signUp?: Maybe<User>;
};


export type QuerySignInArgs = {
  id: Scalars['String'];
  password: Scalars['String'];
};


export type QuerySignUpArgs = {
  answerForSearch: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  questionForSearch: Scalars['String'];
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  answerForSearch: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  questionForSearch: Scalars['String'];
  roles?: Maybe<Array<Maybe<AuthRole>>>;
  userId: Scalars['String'];
};

export type SignInQueryVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInQuery = { __typename?: 'Query', signIn?: string | null };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<SignInQuery, SignInQueryVariables>;
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

export enum AuthQuestion {
  /** 가장 좋아하는 동물은? */
  FavoriteAnimal = 'FAVORITE_ANIMAL',
  /** 가장 좋아하는 색깔은? */
  FavoriteColor = 'FAVORITE_COLOR',
  /** 가장 좋아하는 음식은? */
  FavoriteFood = 'FAVORITE_FOOD',
  /** 가장 좋아하는 영화는? */
  FavoriteMovie = 'FAVORITE_MOVIE',
  /** 가장 좋아하는 숫자는? */
  FavoriteNumber = 'FAVORITE_NUMBER',
  /** 가장 좋아하는 운동은? */
  FavoriteSports = 'FAVORITE_SPORTS'
}

export enum AuthRole {
  /** 개발자(전체권한) */
  Developer = 'DEVELOPER',
  /** 일반사용자 */
  User = 'USER'
}

export type Mutation = {
  __typename?: 'Mutation';
  deleteUser?: Maybe<Scalars['Boolean']>;
  signIn?: Maybe<Scalars['String']>;
  signUp?: Maybe<User>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationSignInArgs = {
  id: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpArgs = {
  answerForSearch: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  questionForSearch: AuthQuestion;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  changePassword?: Maybe<Scalars['Boolean']>;
  validateQuestion?: Maybe<Scalars['Boolean']>;
};


export type QueryChangePasswordArgs = {
  password: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryValidateQuestionArgs = {
  answerForSearch: Scalars['String'];
  questionForSearch: AuthQuestion;
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  answerForSearch: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  questionForSearch: AuthQuestion;
  roles?: Maybe<Array<Maybe<AuthRole>>>;
  userId: Scalars['String'];
};

export type SignInMutationVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: string | null };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
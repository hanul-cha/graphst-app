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
  FavoriteAnimal = 'favorite_animal',
  /** 가장 좋아하는 색깔은? */
  FavoriteColor = 'favorite_color',
  /** 가장 좋아하는 음식은? */
  FavoriteFood = 'favorite_food',
  /** 가장 좋아하는 영화는? */
  FavoriteMovie = 'favorite_movie',
  /** 가장 좋아하는 숫자는? */
  FavoriteNumber = 'favorite_number',
  /** 가장 좋아하는 운동은? */
  FavoriteSports = 'favorite_sports'
}

export enum AuthRole {
  /** 개발자(전체권한) */
  Developer = 'developer',
  /** 일반사용자 */
  User = 'user'
}

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  signIn?: Maybe<Scalars['String']>;
  signUp?: Maybe<User>;
  toggleLikePost?: Maybe<Scalars['Boolean']>;
  toggleLikeUser?: Maybe<Scalars['Boolean']>;
  validateQuestion?: Maybe<Scalars['Boolean']>;
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  userId: Scalars['String'];
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


export type MutationToggleLikePostArgs = {
  like: Scalars['Boolean'];
  targetId: Scalars['String'];
};


export type MutationToggleLikeUserArgs = {
  like: Scalars['Boolean'];
  targetId: Scalars['String'];
};


export type MutationValidateQuestionArgs = {
  answerForSearch: Scalars['String'];
  questionForSearch: AuthQuestion;
  userId: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endPath: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  startPath: Scalars['String'];
};

export type PageOptionInput = {
  after?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<OrderInput>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  contents: Scalars['String'];
  countLike: Scalars['Int'];
  id: Scalars['ID'];
  title: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  users?: Maybe<UserPaginate>;
};


export type QueryUsersArgs = {
  pageOptions?: InputMaybe<PageOptionInput>;
  userOptions?: InputMaybe<UsersOptionsInput>;
};

export type User = {
  __typename?: 'User';
  answerForSearch: Scalars['String'];
  countFollower: Scalars['Int'];
  countFollowing: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  questionForSearch: AuthQuestion;
  roles?: Maybe<Array<AuthRole>>;
  userId: Scalars['String'];
};

export type UsersOptionsInput = {
  /** 해당 아이디를 팔로우 하고 있는 유저들을 필터링 */
  followerId?: InputMaybe<Scalars['String']>;
  /** 해당 아이디가 팔로우 하고 있는 유저들을 필터링 */
  followingId?: InputMaybe<Scalars['String']>;
};

export type OrderInput = {
  asc: Scalars['String'];
  column: Scalars['String'];
};

export type UserPaginate = {
  __typename?: 'userPaginate';
  nodes: Array<User>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', result?: boolean | null };

export type GetFollowerUsersQueryVariables = Exact<{
  followerId: Scalars['String'];
}>;


export type GetFollowerUsersQuery = { __typename?: 'Query', users?: { __typename?: 'userPaginate', totalCount: number, nodes: Array<{ __typename?: 'User', name: string, countFollower: number }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } | null };

export type GetFollowingUsersQueryVariables = Exact<{
  followingId: Scalars['String'];
}>;


export type GetFollowingUsersQuery = { __typename?: 'Query', users?: { __typename?: 'userPaginate', totalCount: number, nodes: Array<{ __typename?: 'User', name: string, countFollower: number }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, questionForSearch: AuthQuestion, answerForSearch: string, countFollower: number, countFollowing: number } | null };

export type SignInMutationVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: string | null };

export type SignUpMutationVariables = Exact<{
  userId: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  questionForSearch: AuthQuestion;
  answerForSearch: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'User', id: string, name: string, questionForSearch: AuthQuestion, answerForSearch: string, countFollower: number, countFollowing: number } | null };

export type ValidateQuestionMutationVariables = Exact<{
  userId: Scalars['String'];
  questionForSearch: AuthQuestion;
  answerForSearch: Scalars['String'];
}>;


export type ValidateQuestionMutation = { __typename?: 'Mutation', result?: boolean | null };

export type UserFullFragment = { __typename?: 'User', id: string, name: string, questionForSearch: AuthQuestion, answerForSearch: string, countFollower: number, countFollowing: number };

export const UserFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"answerForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}},{"kind":"Field","name":{"kind":"Name","value":"countFollowing"}}]}}]} as unknown as DocumentNode<UserFullFragment, unknown>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const GetFollowerUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowerUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userOptions"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"followerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowerUsersQuery, GetFollowerUsersQueryVariables>;
export const GetFollowingUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowingUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userOptions"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"followingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followingId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowingUsersQuery, GetFollowingUsersQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"answerForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}},{"kind":"Field","name":{"kind":"Name","value":"countFollowing"}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionForSearch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthQuestion"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answerForSearch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionForSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionForSearch"}}},{"kind":"Argument","name":{"kind":"Name","value":"answerForSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answerForSearch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"answerForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}},{"kind":"Field","name":{"kind":"Name","value":"countFollowing"}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const ValidateQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionForSearch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthQuestion"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answerForSearch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"validateQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionForSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionForSearch"}}},{"kind":"Argument","name":{"kind":"Name","value":"answerForSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answerForSearch"}}}]}]}}]} as unknown as DocumentNode<ValidateQuestionMutation, ValidateQuestionMutationVariables>;
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
  /** 관리자 */
  Manager = 'manager',
  /** 일반사용자 */
  User = 'user'
}

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  label: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  contents: Scalars['String'];
  countLike: Scalars['Int'];
  countUnlike: Scalars['Int'];
  id: Scalars['ID'];
  isLike: Scalars['Boolean'];
  isMyComment: Scalars['Boolean'];
  isUnlike: Scalars['Boolean'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: Scalars['Boolean'];
  changePassword?: Maybe<Scalars['Boolean']>;
  createComment: Comment;
  createPost: Post;
  deleteCategory: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteUser?: Maybe<Scalars['Boolean']>;
  signIn?: Maybe<Scalars['String']>;
  signUp?: Maybe<User>;
  toggleLikeCommentLike?: Maybe<Scalars['Boolean']>;
  toggleLikeCommentUnlike?: Maybe<Scalars['Boolean']>;
  toggleLikePost?: Maybe<Scalars['Boolean']>;
  toggleLikeUser?: Maybe<Scalars['Boolean']>;
  updateActiveAt: Scalars['Boolean'];
  updatePost: Post;
  validateQuestion?: Maybe<Scalars['Boolean']>;
};


export type MutationAddCategoryArgs = {
  label: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  contents: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  activeAt?: InputMaybe<Scalars['Boolean']>;
  categoryId?: InputMaybe<Scalars['String']>;
  contents: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
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


export type MutationToggleLikeCommentLikeArgs = {
  like: Scalars['Boolean'];
  targetId: Scalars['String'];
};


export type MutationToggleLikeCommentUnlikeArgs = {
  like: Scalars['Boolean'];
  targetId: Scalars['String'];
};


export type MutationToggleLikePostArgs = {
  like: Scalars['Boolean'];
  targetId: Scalars['String'];
};


export type MutationToggleLikeUserArgs = {
  like: Scalars['Boolean'];
  targetId: Scalars['String'];
};


export type MutationUpdateActiveAtArgs = {
  active: Scalars['Boolean'];
  id: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  activeAt?: InputMaybe<Scalars['Boolean']>;
  categoryId?: InputMaybe<Scalars['String']>;
  contents: Scalars['String'];
  postId: Scalars['ID'];
  title: Scalars['String'];
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

export type Post = {
  __typename?: 'Post';
  activeAt: Scalars['Boolean'];
  category?: Maybe<Category>;
  contents: Scalars['String'];
  countComment: Scalars['Int'];
  countLike: Scalars['Int'];
  createAt: Scalars['Int'];
  id: Scalars['ID'];
  isLike: Scalars['Boolean'];
  title: Scalars['String'];
  updateAt: Scalars['Int'];
  user: User;
};

export enum PostOrder {
  Comment = 'comment',
  Follower = 'follower',
  Title = 'title'
}

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  comments?: Maybe<CommentPaginate>;
  getPost?: Maybe<Post>;
  getUser: User;
  getUserPublic?: Maybe<User>;
  posts?: Maybe<PostPaginate>;
  users?: Maybe<UserPaginate>;
};


export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  asc?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  postId?: InputMaybe<Scalars['String']>;
};


export type QueryGetPostArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserPublicArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  asc?: InputMaybe<Scalars['Boolean']>;
  categoryId?: InputMaybe<Scalars['String']>;
  likeUserId?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<PostOrder>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  asc?: InputMaybe<Scalars['Boolean']>;
  followerId?: InputMaybe<Scalars['String']>;
  followingId?: InputMaybe<Scalars['String']>;
  likePostId?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  answerForSearch: Scalars['String'];
  countFollower: Scalars['Int'];
  countFollowing: Scalars['Int'];
  countPost: Scalars['Int'];
  id: Scalars['ID'];
  isLike: Scalars['Boolean'];
  name: Scalars['String'];
  questionForSearch: AuthQuestion;
  roles?: Maybe<Array<AuthRole>>;
  userId: Scalars['String'];
};

export type CommentPaginate = {
  __typename?: 'commentPaginate';
  nodes: Array<Comment>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostPaginate = {
  __typename?: 'postPaginate';
  nodes: Array<Post>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
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

export type CommentPaginationQueryVariables = Exact<{
  perPage?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  postId: Scalars['String'];
}>;


export type CommentPaginationQuery = { __typename?: 'Query', comments?: { __typename?: 'commentPaginate', totalCount: number, nodes: Array<{ __typename?: 'Comment', id: string, contents: string, countLike: number, countUnlike: number, isLike: boolean, isUnlike: boolean, isMyComment: boolean, user: { __typename?: 'User', id: string, name: string } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } | null };

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['String'];
  contents: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', comment: { __typename?: 'Comment', id: string, contents: string, countLike: number, countUnlike: number, isLike: boolean, isUnlike: boolean, isMyComment: boolean, user: { __typename?: 'User', id: string, name: string } } };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  contents: Scalars['String'];
  activeAt?: InputMaybe<Scalars['Boolean']>;
  categoryId?: InputMaybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', post: { __typename?: 'Post', id: string } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', result: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', result: boolean };

export type GetCategoryAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryAllQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, label: string }> };

export type GetFollowerUsersQueryVariables = Exact<{
  followerId: Scalars['String'];
}>;


export type GetFollowerUsersQuery = { __typename?: 'Query', users?: { __typename?: 'userPaginate', totalCount: number, nodes: Array<{ __typename?: 'User', name: string, countFollower: number }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } | null };

export type GetFollowingUsersQueryVariables = Exact<{
  followingId: Scalars['String'];
}>;


export type GetFollowingUsersQuery = { __typename?: 'Query', users?: { __typename?: 'userPaginate', totalCount: number, nodes: Array<{ __typename?: 'User', name: string, countFollower: number }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } | null };

export type PostDetailFragment = { __typename?: 'Post', id: string, title: string, contents: string, createAt: number, updateAt: number, activeAt: boolean, user: { __typename?: 'User', id: string, name: string, questionForSearch: AuthQuestion, answerForSearch: string, countFollower: number, countFollowing: number, countPost: number, isLike: boolean }, category?: { __typename?: 'Category', id: string, label: string } | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', id: string, title: string, contents: string, createAt: number, updateAt: number, activeAt: boolean, user: { __typename?: 'User', id: string, name: string, questionForSearch: AuthQuestion, answerForSearch: string, countFollower: number, countFollowing: number, countPost: number, isLike: boolean }, category?: { __typename?: 'Category', id: string, label: string } | null } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, questionForSearch: AuthQuestion, answerForSearch: string, countFollower: number, countFollowing: number, countPost: number, isLike: boolean } };

export type GetUserPublicQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserPublicQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, questionForSearch: AuthQuestion, answerForSearch: string, countFollower: number, countFollowing: number, countPost: number, isLike: boolean } | null };

export type PostInPageFragment = { __typename?: 'Post', id: string, title: string, countLike: number, isLike: boolean, countComment: number, user: { __typename?: 'User', id: string, name: string }, category?: { __typename?: 'Category', id: string, label: string } | null };

export type PostPaginationQueryVariables = Exact<{
  perPage?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  likeUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<PostOrder>;
  asc?: InputMaybe<Scalars['Boolean']>;
}>;


export type PostPaginationQuery = { __typename?: 'Query', posts?: { __typename?: 'postPaginate', totalCount: number, nodes: Array<{ __typename?: 'Post', id: string, title: string, countLike: number, isLike: boolean, countComment: number, user: { __typename?: 'User', id: string, name: string }, category?: { __typename?: 'Category', id: string, label: string } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } | null };

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


export type SignUpMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'User', id: string } | null };

export type ToggleLikeCommentMutationVariables = Exact<{
  targetId: Scalars['String'];
  like: Scalars['Boolean'];
}>;


export type ToggleLikeCommentMutation = { __typename?: 'Mutation', result?: boolean | null };

export type ToggleLikePostMutationVariables = Exact<{
  targetId: Scalars['String'];
  like: Scalars['Boolean'];
}>;


export type ToggleLikePostMutation = { __typename?: 'Mutation', result?: boolean | null };

export type ToggleLikeUserMutationVariables = Exact<{
  targetId: Scalars['String'];
  like: Scalars['Boolean'];
}>;


export type ToggleLikeUserMutation = { __typename?: 'Mutation', result?: boolean | null };

export type ToggleUnlikeCommentMutationVariables = Exact<{
  targetId: Scalars['String'];
  like: Scalars['Boolean'];
}>;


export type ToggleUnlikeCommentMutation = { __typename?: 'Mutation', result?: boolean | null };

export type UpdatePostMutationVariables = Exact<{
  title: Scalars['String'];
  contents: Scalars['String'];
  activeAt?: InputMaybe<Scalars['Boolean']>;
  categoryId?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', post: { __typename?: 'Post', id: string } };

export type ValidateQuestionMutationVariables = Exact<{
  userId: Scalars['String'];
  questionForSearch: AuthQuestion;
  answerForSearch: Scalars['String'];
}>;


export type ValidateQuestionMutation = { __typename?: 'Mutation', result?: boolean | null };

export type CommentFullFragment = { __typename?: 'Comment', id: string, contents: string, countLike: number, countUnlike: number, isLike: boolean, isUnlike: boolean, isMyComment: boolean, user: { __typename?: 'User', id: string, name: string } };

export type UserFullFragment = { __typename?: 'User', id: string, name: string, questionForSearch: AuthQuestion, answerForSearch: string, countFollower: number, countFollowing: number, countPost: number, isLike: boolean };

export const UserFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"answerForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}},{"kind":"Field","name":{"kind":"Name","value":"countFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"countPost"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}}]}}]} as unknown as DocumentNode<UserFullFragment, unknown>;
export const PostDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFull"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"activeAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"answerForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}},{"kind":"Field","name":{"kind":"Name","value":"countFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"countPost"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}}]}}]} as unknown as DocumentNode<PostDetailFragment, unknown>;
export const PostInPageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostInPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"countLike"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countComment"}}]}}]} as unknown as DocumentNode<PostInPageFragment, unknown>;
export const CommentFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"countLike"}},{"kind":"Field","name":{"kind":"Name","value":"countUnlike"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"isUnlike"}},{"kind":"Field","name":{"kind":"Name","value":"isMyComment"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CommentFullFragment, unknown>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CommentPaginationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentPagination"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFull"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"countLike"}},{"kind":"Field","name":{"kind":"Name","value":"countUnlike"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"isUnlike"}},{"kind":"Field","name":{"kind":"Name","value":"isMyComment"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CommentPaginationQuery, CommentPaginationQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contents"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"comment"},"name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"countLike"}},{"kind":"Field","name":{"kind":"Name","value":"countUnlike"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"isUnlike"}},{"kind":"Field","name":{"kind":"Name","value":"isMyComment"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contents"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activeAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"post"},"name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contents"}}},{"kind":"Argument","name":{"kind":"Name","value":"activeAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activeAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const GetCategoryAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoryAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetCategoryAllQuery, GetCategoryAllQueryVariables>;
export const GetFollowerUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowerUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"followerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowerUsersQuery, GetFollowerUsersQueryVariables>;
export const GetFollowingUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowingUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"followingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowingUsersQuery, GetFollowingUsersQueryVariables>;
export const GetPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"answerForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}},{"kind":"Field","name":{"kind":"Name","value":"countFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"countPost"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFull"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"activeAt"}}]}}]} as unknown as DocumentNode<GetPostQuery, GetPostQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"answerForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}},{"kind":"Field","name":{"kind":"Name","value":"countFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"countPost"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUserPublicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserPublic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getUserPublic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"answerForSearch"}},{"kind":"Field","name":{"kind":"Name","value":"countFollower"}},{"kind":"Field","name":{"kind":"Name","value":"countFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"countPost"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}}]}}]} as unknown as DocumentNode<GetUserPublicQuery, GetUserPublicQueryVariables>;
export const PostPaginationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostPagination"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likeUserId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PostOrder"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"asc"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"likeUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likeUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"asc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"asc"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostInPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostInPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"countLike"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countComment"}}]}}]} as unknown as DocumentNode<PostPaginationQuery, PostPaginationQueryVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionForSearch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthQuestion"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answerForSearch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionForSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionForSearch"}}},{"kind":"Argument","name":{"kind":"Name","value":"answerForSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answerForSearch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const ToggleLikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleLikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"like"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"toggleLikeCommentLike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"like"}}}]}]}}]} as unknown as DocumentNode<ToggleLikeCommentMutation, ToggleLikeCommentMutationVariables>;
export const ToggleLikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleLikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"like"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"toggleLikePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"like"}}}]}]}}]} as unknown as DocumentNode<ToggleLikePostMutation, ToggleLikePostMutationVariables>;
export const ToggleLikeUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleLikeUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"like"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"toggleLikeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"like"}}}]}]}}]} as unknown as DocumentNode<ToggleLikeUserMutation, ToggleLikeUserMutationVariables>;
export const ToggleUnlikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleUnlikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"like"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"toggleLikeCommentUnlike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"like"}}}]}]}}]} as unknown as DocumentNode<ToggleUnlikeCommentMutation, ToggleUnlikeCommentMutationVariables>;
export const UpdatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contents"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activeAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"post"},"name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contents"}}},{"kind":"Argument","name":{"kind":"Name","value":"activeAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activeAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>;
export const ValidateQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionForSearch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthQuestion"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answerForSearch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"validateQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionForSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionForSearch"}}},{"kind":"Argument","name":{"kind":"Name","value":"answerForSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answerForSearch"}}}]}]}}]} as unknown as DocumentNode<ValidateQuestionMutation, ValidateQuestionMutationVariables>;
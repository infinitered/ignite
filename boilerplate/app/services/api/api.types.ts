import { GeneralApiProblem } from "./api-problem"

export interface FakeUser {
  id: number
  name: string
}

export type FakeGetUsersResult = { kind: "ok"; users: FakeUser[] } | GeneralApiProblem
export type FakeGetUserResult = { kind: "ok"; user: FakeUser } | GeneralApiProblem

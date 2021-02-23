import { GeneralApiProblem } from "./api-problem"
import { DataUserProps } from "../../models/list-demo/list-demo.props"

export interface User {
  id: number
  name: string
}
export interface ListProps {
  results: DataUserProps[]
}
export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetListResult = { kind: "ok"; data: ListProps } | GeneralApiProblem

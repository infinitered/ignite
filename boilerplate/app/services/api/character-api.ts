import { ApiResponse } from "apisauce"
import { CharacterSnapshot } from '../../models/character/character'
import { makeid } from "../../utils/string"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

const convertCharacter = (raw: any): CharacterSnapshot => {
  return {
    id: makeid(25),
    image: raw.image,
    name: raw.name,
    status: raw.status,
  }
}

export class CharacterApi {
    private api: Api;

    constructor(api: Api) {
      this.api = api
    }

    async getQuestions(): Promise<any> {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get("https://rickandmortyapi.com/api/character", { amount: API_PAGE_SIZE })

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      // transform the data into the format we are expecting
      try {
        const rawCharacters = response.data.results
        const convertedCharacters: CharacterSnapshot[] = rawCharacters.map(convertCharacter)

        const responseCharacters = { kind: "ok", questions: convertedCharacters }
        return responseCharacters
      } catch (e) {
        __DEV__ && console.tron.log(e.message)
        return { kind: "bad-data" }
      }
    }
}

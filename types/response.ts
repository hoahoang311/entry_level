import { ProgramDetail } from './common'

export interface GenericAPIRequestResponse {
  data?: SessionDataObject | unknown
  error?: string
  success: false
}

export interface SessionDataObject {
  id: string
  name: string
  status: string
  start_date: string
  end_date: string
  created_at: string
  program: ProgramDetail[]
}

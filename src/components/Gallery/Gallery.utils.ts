import { PencilQuery } from '../Pencil/Pencil.interface'

export const requestFirstPage = (query: PencilQuery): PencilQuery => ({ ...query, page: 1 })

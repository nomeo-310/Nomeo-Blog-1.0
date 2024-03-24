import { latestBlogProps } from "@/types/types";
import axios from "axios";

export interface paginationProps {
  createArray?: boolean
  state: { results: latestBlogProps[], page: number, totalDocs: number},
  data: latestBlogProps[]
  page: number
  countRoute: string
  sentData?: any
}

export const paginateData = async ({ createArray, state, data, page, countRoute, sentData = { }}:paginationProps) => {
  let obj;

  if (state !== null && !createArray) {
    obj = { ...state, results: [...state.results, ...data], page: page }
  } else {
    await axios.post(countRoute, sentData)
    .then(({data: { totalDocs }}) => {
      obj = { results: data, page: page, totalDocs}})
      .catch((error:any) => {
        console.log(error)
      })
  }

  return obj;
};

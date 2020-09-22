import { SEARCH } from './actionTypes';

export function search(value) {
  return {type: SEARCH, value};
}
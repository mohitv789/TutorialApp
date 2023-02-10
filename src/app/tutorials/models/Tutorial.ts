
export interface Tutorial {
  id: string;
  seqNo:number;
  iconUrl: string;
  description: string;
  longDescription?: string;
  field: string;
  owner: string;
}


export function compareTutorials(t1:Tutorial, t2: Tutorial) {

  const compare = t1.seqNo - t2.seqNo;

  if (compare > 0) {
    return 1;
  }
  else if ( compare < 0) {
    return -1;
  }
  else return 0;

}

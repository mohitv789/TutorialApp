export interface Section {
    id: string;
    description: string;
    seqNo: number;
    tutorialId: string;
    solution: string;
    image?: string;
    time?: string;
}

export function compareSections(s1:Section, s2: Section) {

  const compareSections = s1.seqNo - s2.seqNo;

  if (compareSections > 0) {
    return 1;
  }
  else if (compareSections < 0){
    return -1;
  }
  else {
    return s1.seqNo - s2.seqNo;
  }

}

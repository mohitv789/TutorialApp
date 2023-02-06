

export interface Section {
    id: number;
    description: string;
    duration: string;
    seqNo: number;
    tutorialId: number;
    solution: string;
    images?: [];
}


export function compareSections(s1:Section, s2: Section) {

  const compareSections = s1.tutorialId - s2.tutorialId;

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

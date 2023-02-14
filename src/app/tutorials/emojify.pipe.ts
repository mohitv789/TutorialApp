import { PipeTransform, Pipe } from '@angular/core';
import { Value } from 'node_modules/ngx-tfjs/public-api.js';


const labels = [
  '😊',
  '😒',
  '🤐',
  '😦',
  '😡',
  '🤬',
  '⛔️'
];

@Pipe({
  name: 'emojify',
})
export class EmojifyPipe implements PipeTransform {
  transform(value: Value) {
    if (!value) {
      return '😑';
    }
    const matches = value.reduce((total:number, a:any) => a.match ? ++total : total, 0);
    if (!matches) {
      return '😊';
    }
    return labels[matches];
  }
}

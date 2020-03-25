import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ 
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(records: any[], query: string, propName: string): any[] {
        if (!records.length || !query) return records;

        return records.filter(it => (it[propName] as string).slice(0, query.length) === query.toLowerCase());
    }
}
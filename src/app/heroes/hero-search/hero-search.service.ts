import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../hero';

@Injectable()
export class HeroSearchService {
    constructor(private http: HttpClient) { }
    search(term: string): Observable<Hero[]> {
        return this.http
            .get<Hero[]>(`app/heroes/?name=${term}`)
            .pipe(
                map(heroes => heroes)
            );
    }
}
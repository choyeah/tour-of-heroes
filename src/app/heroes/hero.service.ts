import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .toPromise()
      .then(response => response as Hero[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).toPromise().then(response => response as Hero).catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 0);
    });
  }

  async update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    try {
      const response = await this.http.put<Hero>(url, hero).toPromise();
      return response as Hero;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async create(name: string): Promise<Hero> {
    try {
      const hero = { name } as Hero; // 객체로 생성
      const response = await this.http.post<Hero>(this.heroesUrl, hero, { headers: this.headers }).toPromise();
      return response as Hero;
    } catch (error) {
      console.error('영웅 생성 중 오류 발생:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
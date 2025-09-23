import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HtmlChunk } from '../models/HtmlChunk';


@Injectable({
  providedIn: 'root'
})
export class HtmlChunkService {
  private apiUrl = `${environment.apiUrl}htmlchunks`;

  constructor(private http: HttpClient) { }

  getHtmlChunk(id: number): Observable<HtmlChunk> {
    console.log(`Fetching HTML chunk with ID: ${this.apiUrl}/${id} `);
    return this.http.get<HtmlChunk>(`${this.apiUrl}/${id}`);
  }

  getHtmlChunkByName(name: string): Observable<HtmlChunk> {
    return this.http.get<HtmlChunk>(`${this.apiUrl}/nombre/${encodeURIComponent(name)}`);
  }

  getAll(): Observable<HtmlChunk[]> {
    return this.http.get<HtmlChunk[]>(this.apiUrl);
  }

  updateHtmlChunk(chunk: HtmlChunk): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${chunk.id}`, chunk);
  }


}

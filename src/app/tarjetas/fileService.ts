import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

private baseApiUrl: string = `${environment.apiUrl}staticfiles/`;

  constructor(private http: HttpClient) { }

  getFile(folder: string, fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseApiUrl}${folder}/${fileName}`, { responseType: 'blob' });
  }

  loadImage(fileName: string): Observable<string> {
    return this.getFile('img', fileName).pipe(
      map(blob => window.URL.createObjectURL(blob))
    );
  }

  loadPDF(fileName: string): Observable<string> {
    return this.getFile('pdf', fileName).pipe(
      map(blob => window.URL.createObjectURL(blob))
    );
  }

  listImages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseApiUrl}img/list`);
  }

  uploadImage(file: File): Observable<any> {
    console.log('Uploading file:', file, this.baseApiUrl);
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseApiUrl}img/upload`, formData);
  }

  deleteImage(fileName: string): Observable<any> {
    console.log('Deleting file:', fileName, this.baseApiUrl);
    return this.http.delete(`${this.baseApiUrl}img/delete/${fileName}`);
  }

  renameImage(oldName: string, newName: string): Observable<any> {
    return this.http.put(`${this.baseApiUrl}img/rename`, { oldName, newName });
  }
}

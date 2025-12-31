import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MCUItem } from '../../app/models/mcu-item.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private dataUrl = 'assets/data/mcu_movies_data.json';

  constructor(private http: HttpClient) {}

  getTimeline(): Observable<MCUItem[]> {
    return this.http.get<MCUItem[]>(this.dataUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  // API URL
  private apiUrl = 'http://localhost:5041/api/test';
  constructor (private http: HttpClient) {}
  // GET
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }
  // GET (by Id)
  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }
  // POST
  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(this.apiUrl, vehicle);
  }
  // PUT
  updateVehicle(id: number, vehicle: Vehicle): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, vehicle);
  }
  // DELETE
  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface UserLocation {
  street: { number: number; name: string };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

export interface User {
  login: { uuid: string; username: string };
  name: UserName;
  email: string;
  phone: string;
  cell: string;
  gender: string;
  nat: string;
  picture: UserPicture;
  location: UserLocation;
  dob: { date: string; age: number };
  registered: { date: string; age: number };
}

interface RandomUserResponse {
  results: User[];
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  getUsers(count = 100): Observable<User[]> {
    return this.http
      .get<RandomUserResponse>(`https://randomuser.me/api/?results=${count}&seed=angular-starter`)
      .pipe(map(res => res.results));
  }
}

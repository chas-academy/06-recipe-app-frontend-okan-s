import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private token: string

  apiURL = 'http://recipe-api.okasi.me/api'

  constructor(
    private http: HttpClient, 
    private router: Router,
    ) {}

  private saveToken(token) {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  getUserDetails() {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  isLoggedIn() {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  register(user): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user, 
    {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  login(user): Observable<any> {
    const base = this.http.post(
      `${this.apiURL}/login`,
      { 
        email: user.email, 
        password: user.password 
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    const request = base.pipe(
      map((data: any) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  logout() {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }

  profile(): Observable<any> {
    return this.http.get(`${this.apiURL}/profile`, 
    {
      headers: { 
        Authorization: `Bearer ${this.getToken()}` 
      }
    })
  }

  showFavorites(): Observable<any> {
    return this.http.get(`${this.apiURL}/favorites`, 
    {
      headers: { 
        Authorization: `Bearer ${this.getToken()}` 
      }
    })
  }

  storeFavorite(id): Observable<any> {
    return this.http.get(`${this.apiURL}/favorite/store/${id}`, //Only works with GET?
    {
      headers: { 
        Authorization: `Bearer ${this.getToken()}` 
      }
    })
  }

  deleteFavorite(id): Observable<any> {
    return this.http.delete(`${this.apiURL}/favorite/delete/${id}`, 
    {
      headers: { 
        Authorization: `Bearer ${this.getToken()}` 
      }
    })
  }

  checkFavorite(id): Observable<any> {
    return this.http.get(`${this.apiURL}/favorite/check/${id}`, 
    {
      headers: { 
        Authorization: `Bearer ${this.getToken()}` 
      }
    })
  }
}

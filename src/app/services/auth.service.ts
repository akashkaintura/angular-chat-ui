import { Injectable, NgZone, Inject, PLATFORM_ID, inject } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase!: SupabaseClient;
  private router = inject(Router);
  private _ngZone = inject(NgZone);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    if (this.isBrowser) {
      this.supabase.auth.onAuthStateChange((event, session) => {
        console.log('event', event);
        console.log('session', session);

        localStorage.setItem('session', JSON.stringify(session?.user));

        if (session?.user) {
          this._ngZone.run(() => {
            this.router.navigate(['/chat']);
          });
        }
      });
    }
  }

  get isLoggedIn(): boolean {
    if (this.isBrowser) {
      const user = localStorage.getItem('session') as string;
      return user !== 'undefined' && user !== null;
    }
    return false;
  }

  async signInWithGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}

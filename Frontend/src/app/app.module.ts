import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { PrimengModule } from './primeng/primeng.module';

import { AppComponent } from './app.component';
import { Error404Component } from './error/error404/error404.component';

import { AuthModule } from './auth/auth.module';
import { AcademicsModule } from './academics/academics.module';

import { ModifyHeaderInterceptor } from './interceptor/modify-header.interceptor';
import { ValidarSesionInterceptor } from './interceptor/validar-sesion.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    AcademicsModule,
    PrimengModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ModifyHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ValidarSesionInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

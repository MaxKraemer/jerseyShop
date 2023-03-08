import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TitleComponent } from './title/title.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CartComponent } from './cart/cart.component';
import { JerseySectionComponent } from './jersey-section/jersey-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerContainerComponent } from './banner-container/banner-container.component';
import { PlayerContainerComponent } from './player-container/player-container.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule} from "@angular/material/icon";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import {CarouselModule} from "@coreui/angular";
import {MatBadgeModule} from "@angular/material/badge";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TitleComponent,
    NavbarComponent,
    ProductsComponent,
    LoginRegisterComponent,
    CustomerProfileComponent,
    CartComponent,
    JerseySectionComponent,
    BannerContainerComponent,
    PlayerContainerComponent,
    FooterComponent,
    HomeComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        RouterLink,
        RouterLinkActive,
        AppRoutingModule,
        CarouselModule,
        MatBadgeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

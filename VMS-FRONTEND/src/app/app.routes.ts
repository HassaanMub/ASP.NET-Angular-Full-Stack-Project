import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Vehicles } from './pages/vehicles/vehicles';
import { ProductDetails } from './pages/product-details/product-details';
import { AboutContact } from './pages/about-contact/about-contact';
import { Sell } from './pages/sell/sell';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'vehicles', component: Vehicles },
    { path: 'vehicles/:id', component: ProductDetails },
    { path: 'about-contact', component: AboutContact },
    { path: 'sell', component: Sell },
];

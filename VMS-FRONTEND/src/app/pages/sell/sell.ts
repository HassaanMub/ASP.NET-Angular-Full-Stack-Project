import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-sell',
  imports: [FormsModule, CommonModule],
  templateUrl: './sell.html',
  styleUrl: './sell.css',
})
export class Sell {
  constructor(
    private vehicleService: VehicleService,
    private cdr: ChangeDetectorRef
  ) { }
  // Vehicle Object
  vehicle: Vehicle = {
    brand: '',
    model: '',
    year: 0,
    color: '',
    fuelType: '',
    mileage: 0,
    price: 0,
    sellerName: '',
    sellerPhone: '',
    sellerLocation: '',
    description: '',
    imageUrl: ''
  };

  // Validation Checks
  // validationErrors: string[] = [];
  // showValidationPopup: boolean = false;
  showPopup = false;
  popupType: 'error' | 'success' = 'error';
  popupMessages: string[] = [];

  addVehicle(): void {
    this.popupMessages = [];
    this.showPopup = false;

    // BRAND
    if (!this.vehicle.brand.trim()) { this.popupMessages.push("Brand is required."); }
    // MODEL
    if (!this.vehicle.model.trim()) { this.popupMessages.push("Model is required."); }
    // YEAR
    if (this.vehicle.year <= 0 && this.vehicle.year >= 1900 && this.vehicle.year <= 2030) {
      this.popupMessages.push("Enter a valid year.");
    }
    // COLOR
    if (!this.vehicle.color.trim()) { this.popupMessages.push("Color is required."); }
    // FUEL TYPE
    if (!this.vehicle.fuelType.trim()) { this.popupMessages.push("Fuel type is required."); }
    // MILEAGE
    if (this.vehicle.mileage < 100) { this.popupMessages.push("Enter a Valid Mileage Amount."); }
    // PRICE
    if (this.vehicle.price <= 1000) { this.popupMessages.push("Enter a Price Above Rs 1000."); }
    // SELLER NAME
    if (!this.vehicle.sellerName.trim()) { this.popupMessages.push("Seller name is required."); }
    // PHONE
    if (!this.vehicle.sellerPhone.trim()) { this.popupMessages.push("Phone number is required."); }
    // LOCATION
    if (!this.vehicle.sellerLocation.trim()) { this.popupMessages.push("Location is required."); }
    // IMAGE URL
    if (!this.vehicle.imageUrl.trim()) { this.popupMessages.push("Image URL is required."); }
    // DESCRIPTION
    if (!this.vehicle.description.trim()) { this.popupMessages.push("Description is required."); }
    // IF ERRORS EXIST
    if (this.popupMessages.length > 0) {
      this.popupType = 'error';
      this.showPopup = true;
      return;
    }
    // API CALL
    this.vehicleService.addVehicle(this.vehicle).subscribe({
      next: (res) => {
        console.log(res)
        this.popupType = 'success';
        this.popupMessages = ["Vehicle Added Successfully!"];
        this.showPopup = true;
        this.cdr.detectChanges();
        this.vehicle = {
          brand: '',
          model: '',
          year: 0,
          color: '',
          fuelType: '',
          mileage: 0,
          price: 0,
          sellerName: '',
          sellerPhone: '',
          sellerLocation: '',
          description: '',
          imageUrl: ''
        };
      },
      error: (err) => {
        console.log(err);
        this.popupType = 'success';
        this.popupMessages = ["Vehicle Added Successfully!"];
        this.showPopup = true;
        this.cdr.detectChanges();
      }
    })
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle';

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css',
})
export class Vehicles implements OnInit {
  // Vehicle Objects
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  // Search Input
  searchText: string = '';
  // Filter Inputs
  brandFilter: string = '';
  modelFilter: string = '';
  colorFilter: string = '';
  fuelFilter: string = '';
  minYear: number | null = null;
  maxYear: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minMileage: number | null = null;
  maxMileage: number | null = null;
  // View Modes
  viewMode: 'grid' | 'list' = 'grid';

  constructor(
    private vehicleService: VehicleService, 
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.loadVehicles();
  }
  // LOAD ALL VEHICLES
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(data => {
      console.log(data);
      this.vehicles = data;
      this.filteredVehicles = data;
      this.cdr.detectChanges();
    });
  }
  // SEARCH VEHICLES
  searchVehicles(): void {
    this.filteredVehicles = this.vehicles.filter(vehicle =>
      vehicle.brand.toLowerCase().includes(this.searchText.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(this.searchText.toLowerCase()) ||
      vehicle.fuelType.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  applyFilters(): void {
    this.filteredVehicles = this.vehicles.filter(v => {
      const searchMatch = v.brand.toLowerCase().includes(this.searchText.toLowerCase()) || v.model.toLowerCase().includes(this.searchText.toLowerCase()) || v.fuelType.toLowerCase().includes(this.searchText.toLowerCase());
      const brandMatch = this.brandFilter === '' || v.brand.toLowerCase().includes(this.brandFilter.toLowerCase());
      const modelMatch = this.modelFilter === '' || v.model.toLowerCase().includes(this.modelFilter.toLowerCase());
      const colorMatch = this.colorFilter === '' || v.color.toLowerCase().includes(this.colorFilter.toLowerCase());
      const fuelMatch = this.fuelFilter === '' || v.fuelType.toLowerCase().includes(this.fuelFilter.toLowerCase());
      const yearMatch = (this.minYear === null || v.year >= this.minYear) && (this.maxYear === null || v.year <= this.maxYear);
      const priceMatch = (this.minPrice === null || v.price >= this.minPrice) && (this.maxPrice === null || v.price <= this.maxPrice);
      const mileageMatch = (this.minMileage === null || v.mileage >= this.minMileage) && (this.maxMileage === null || v.mileage <= this.maxMileage);
      return (searchMatch && brandMatch && modelMatch && colorMatch && fuelMatch && yearMatch && priceMatch && mileageMatch);
    });
  }
  setGridView(): void { this.viewMode = 'grid'; }
  setListView(): void { this.viewMode = 'list'; }

  // Time Format
  getTimeAgo(dateString: string | Date | undefined): string {
    const now = new Date();
    const past = new Date(dateString!);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) { return `${years} year${years > 1 ? 's' : ''} ago`; }
    if (months > 0) { return `${months} month${months > 1 ? 's' : ''} ago`; }
    if (weeks > 0) { return `${weeks} week${weeks > 1 ? 's' : ''} ago`; }
    if (days > 0) { return `${days} day${days > 1 ? 's' : ''} ago`; }
    if (hours > 0) { return `${hours} hour${hours > 1 ? 's' : ''} ago`; }
    if (minutes > 0) { return `${minutes} minute${minutes > 1 ? 's' : ''} ago`; }
    return `Just now`;
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle';
import { Vehicle } from '../../models/vehicle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private cdr: ChangeDetectorRef
  ) {}

  vehicle: Vehicle | null = null;

  // delete popup
  showDeletePopup: boolean = false;
  // edit popup
  showEditPopup: boolean = false;
  // Editing Vehicle Copy
  editingVehicle: Vehicle | null = null;

  //Open Edit popup
  openEditPopup(): void{
    if (!this.vehicle) return;
    this.editingVehicle = {...this.vehicle};
    this.showEditPopup = true;
    this.cdr.detectChanges();
  }
  //Close Edit Popup
  closeEditPopup(): void{
    this.showEditPopup = false;
    this.editingVehicle = null;
    this.cdr.detectChanges();
  }
  updateVehicle(): void {
    if (!this.editingVehicle || !this.editingVehicle.id) return;
    this.vehicleService.updateVehicle(
      this.editingVehicle.id,
      this.editingVehicle
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.vehicle = {...this.editingVehicle!};
        this.showEditPopup = false;
        this.editingVehicle = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Open Delete Popup
  openDeletePopup(): void{
    this.showDeletePopup = true;
    this.cdr.detectChanges();
  }
  closeDeletePopup(): void{
    this.showDeletePopup = false;
    this.cdr.detectChanges();
  }
  // Delete Popup
  deleteVehicle(): void{
    if (!this.vehicle || !this.vehicle.id) return;
    this.vehicleService.deleteVehicle(this.vehicle.id).subscribe({
      next: (res) => {
        console.log(res);
        this.showDeletePopup = false;
        this.router.navigate(['/vehicles']);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.getVehicle(id).subscribe({
      next: (data) => {
        console.log(data);
        this.vehicle = data;
        this.cdr.detectChanges();
      },
      error: (err) => { console.log(err); }
    });
  }
}
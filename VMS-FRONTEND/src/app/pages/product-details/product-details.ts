import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicle-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  vehicle: Vehicle | null = null;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private cdr: ChangeDetectorRef
  ) {}

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
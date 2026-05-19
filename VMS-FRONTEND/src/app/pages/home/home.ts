import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // ← Added ChangeDetectorRef
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  public displayedText: string = '';
  
  private fullText: string = 'Your Next Car Starts Here.';
  private currentIdx: number = 0;
  private typingSpeed: number = 75;
  private pauseDuration: number = 2500;
  private timeoutId: any;

  // Inject ChangeDetectorRef into the constructor
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.typeEffect();
  }

  private typeEffect(): void {
    if (this.currentIdx < this.fullText.length) {
      this.displayedText += this.fullText.charAt(this.currentIdx);
      this.currentIdx++;
      this.cdr.detectChanges(); 
      
      this.timeoutId = setTimeout(() => this.typeEffect(), this.typingSpeed);
    } 
    else {
      this.timeoutId = setTimeout(() => {
        this.displayedText = '';
        this.currentIdx = 0;
        this.cdr.detectChanges(); 
        this.typeEffect();
      }, this.pauseDuration);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   imports: [],
//   templateUrl: './home.html',
//   styleUrl: './home.css',
// })
// export class Home {}

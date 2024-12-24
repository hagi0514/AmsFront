import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnDestroy {
  menuItems: any[];
  isLoggedIn = false;
  showCompanyDropdown = false;
  showCpoDropdown = false;
  showAuctionDropdown = false;
  showSampleDropdown = false;
  showUserDropdown = false;


  userRole?: string;
  private authStatusSubscription?: Subscription;

  constructor(private authService: AuthService,
   
  ) { }

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isLoggedIn = status;
      this.userRole = this.authService.getRoleFromToken();
      console.log(this.userRole);
    });
  }
  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
}
  toggleCompanyDropdown() {
    this.showCompanyDropdown = !this.showCompanyDropdown;
}

toggleCpoDropdown() {
    this.showCpoDropdown = !this.showCpoDropdown;
}

toggleAuctionDropdown() {
    this.showAuctionDropdown = !this.showAuctionDropdown;
}

toggleSampleDropdown() {
    this.showSampleDropdown = !this.showSampleDropdown;
}

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
    // You can use this `userRole` to conditionally display sidebar links in the template
  }
}

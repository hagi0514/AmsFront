import { Component, OnInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'app/services/notification-service';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Users } from 'app/models/users';
import { UsersService } from 'app/services/users.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean=false;
    auctions: any[] = [];
    showDropdown: boolean = false;
    showProfileDropdown: boolean = false;
    notifications: any[] = [];
    isLoggedIn = false;
    userId: number;
    user:Users=new Users();
    profileImage: string | null = null; // URL of the current profile image
    defaultProfileImage = '/assets/img/default-profile.png'; // Default image path
    selectedFile: File | null = null; // Selected file for upload
    errorMessage: string = '';
    changePic=false;

     token = localStorage.getItem('auth_token');

    private authStatusSubscription?: Subscription 

    constructor(location: Location, 
         private element: ElementRef, 
         private router: Router,
         private renderer: Renderer2,
         private authService:AuthService,
         private http:HttpClient,
         private notificationService:NotificationService,
         private userService:UsersService
               ) {this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                  this.sidebarClose(); // Call after navigation completes
               }
              });
    }

    ngOnInit() {
      try {
          const decodedToken: any = jwtDecode(this.token);
          this.userId = decodedToken.userId; 
          console.log("navbar userId"+this.userId)
      } catch (error) {
          alert('Invalid token or unable to decode token');
          return;
      }
  
      this.userService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.user = data;
          this.profileImage = data.profileImage;
          console.log("profile image  ======="+this.profileImage)

          console.log("User INfo"+JSON.stringify(this.user,null,2));// Populate the users object
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
      this.toggleButton = document.querySelector('.navbar-toggler');
      if (!this.toggleButton) {
        console.warn('Navbar toggler button not found!');
      }
  
    //   this.toggleButton = document.querySelector('.navbar-toggler');

    // if (!this.toggleButton) {
    //     console.warn("Toggle button element could not be found during initialization.");
    // }
    
      this.authService.getAuthStatus().subscribe((status) => {
        this.isLoggedIn = status;
        this.loadNotifications();
        // console.log('User logged in:', status);
      });
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.querySelector('.navbar-toggler');
      if (!this.toggleButton) {
          // console.warn("Navbar toggler button not found!");
      }    

       
      this.router.events.subscribe((event) => {
          this.sidebarClose();
          const $layer = document.getElementsByClassName('close-layer')[0];
          if ($layer) {
              $layer.remove();
              this.mobile_menu_visible = 0;
          }
      });
  }
    
  
    isMouseOverDropdown = false;
    isMouseOverButton = false;
  
  
    onMouseOverButton() {
      console.log('Mouse over button');
      this.isMouseOverButton = true;
      this.showDropdown = true;
    }
  
    onMouseOutButton() {
      console.log('Mouse out button');
      this.isMouseOverButton = false;
      this.onMouseOut();
    }
  
    onMouseOverDropdown() {
      console.log('Mouse over dropdown');
      this.isMouseOverDropdown = true;
      this.showDropdown = true;
    }
  
    onMouseOutDropdown() {
      console.log('Mouse out dropdown');
      this.isMouseOverDropdown = false;
      this.onMouseOut();
    }
  
    onMouseOut() {
      setTimeout(() => {
        if (!this.isMouseOverDropdown && !this.isMouseOverButton) {
          console.log('Hiding dropdown');
          this.showDropdown = false;
        }
      }, 200); // Slight delay to handle transitions smoothly
    }
  
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      console.log('Dropdown toggled:', this.showDropdown);
    }
     
    isMouseOverProfileDropdown = false;
    isMouseOverProfileButton = false;
    
  
    onMouseOverProfileButton() {
      console.log('Mouse over button');
      this.isMouseOverProfileButton = true;
      this.showProfileDropdown = true;
    }
  
    onMouseOutProfileButton() {
      console.log('Mouse out button');
      this.isMouseOverProfileButton = false;
      this.onMouseProfileOut();
    }
  
    onMouseOverProfileDropdown() {
      console.log('Mouse over dropdown');
      this.isMouseOverProfileDropdown = true;
      this.showProfileDropdown = true;
    }
  
    onMouseOutProfileDropdown() {
      console.log('Mouse out dropdown');
      this.isMouseOverProfileDropdown = false;
      this.onMouseProfileOut();
    }
  
    onMouseProfileOut() {
      setTimeout(() => {
        if (!this.isMouseOverProfileDropdown && !this.isMouseOverProfileButton) {
          console.log('Hiding dropdown');
          this.showProfileDropdown = false;
        }
      }, 200); // Slight delay to handle transitions smoothly
    }
  
    toggleProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown;
      console.log('Dropdown toggled:', this.showProfileDropdown);
    }
  
  
  
    // onProfileMouseOver() {
    //   this.showProfileDropdown = true;
    // }
  
    // onProfileMouseOut() {
    //   // this.showProfileDropdown = false;
    // }
  
  
  

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });
  }



  deleteNotification(notificationId: number): void {
    this.notificationService.dismissNotification(notificationId).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.id !== notificationId);
    });
  }


sidebarToggle() {
  const body = document.body;
  if (this.sidebarVisible) {
    this.renderer.removeClass(body, 'nav-open');
    this.sidebarVisible = false;
  } else {
    this.renderer.addClass(body, 'nav-open');
    this.sidebarVisible = true;
  }
}


  sidebarOpen() {
    console.log("Opening sidebar...");
    const body = document.getElementsByTagName('body')[0];
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
        sidebar.classList.add('active'); // Optional: Add a class to the sidebar for debugging
    } else {
        // console.error("Sidebar element not found");
    }

    body.classList.add('nav-open');
    this.sidebarVisible = true;
    // console.log("Sidebar visibility (after adding class):", this.sidebarVisible);
}

sidebarClose() {
    // console.log("Closing sidebar...");
    const body = document.getElementsByTagName('body')[0];
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
        sidebar.classList.remove('active'); // Optional: Remove the class from the sidebar
    } else {
        console.error("Sidebar element not found");
    }

    body.classList.remove('nav-open');
    this.sidebarVisible = false;
    console.log("Sidebar visibility (after removing class):", this.sidebarVisible);
}





    
    
    
onChangePicSelected(even:any){
this.changePic=true;
}
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;

    // Preview selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Call UsersService to update the profile picture
changeProfilePic() {
  if (!this.selectedFile) return;

  this.userService.changeProfilePic(this.userId, this.selectedFile).subscribe({
    next: () => {
      alert('Profile picture updated successfully!');
      this.selectedFile = null;
    },
    error: (err) => {
      this.errorMessage = 'Failed to update profile picture. Please try again.';
      console.error(err);
    }
  });
}
  
    
      

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    logout(): void {
      this.authService.logout();
      this.authService.setAuthStatus(false); // Update status after login
      this.router.navigate(['/login']);
  
    }
  
      

}

import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { query } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatToolbarModule, MatSidenavModule, RouterOutlet,
    RouterLink, RouterLinkActive

  ], // Add MatSidenavModule to imports
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showButtonToolbar: boolean = false;
  showFiller = false;
  screenWidth: number = window.innerWidth;
  isSidebarOpen: boolean = true; // Sidebar initially open
  menus: any[] = [
    { name: 'Général', id: 'button-go-to-main', url: '/' },
    { name: 'Chatbot', id: 'button-chatbot', url: '/chatbot' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.toggleSidebar();
      this.showButtonToolbar = true;
    } else {
      this.toggleSidebar();
      this.showButtonToolbar = false;
    }

    console.log('Largeur initiale d\'écran:', this.screenWidth);

    // Listen to window resize events
    window.addEventListener('resize', (event) => {
      if (window.innerWidth < 768) {
      } else {
        console.log('Largeur d\'écran:', window.innerWidth);
        this.toggleSidebar(true);
      }
    });
    // Listen to route changes and apply correct styles
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.highlightActiveMenu(event.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit() {
    this.highlightActiveMenu(this.router.url);
  }

  /**
  * Highlight the menu item corresponding to the current route
  * @param currentUrl
  */
  private highlightActiveMenu(currentUrl: string) {
    console.log('activeMenu:', currentUrl);
    if (currentUrl === "/") {
      this.SetStyleToolbar(this.menus[0]);
    } else if (currentUrl === "/education-followed") {
      this.SetStyleToolbar(this.menus[1]);
    } else if (currentUrl === "/projects") {
      this.SetStyleToolbar(this.menus[2]);
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if ((event.target as Window).innerWidth < 768) {
      this.showButtonToolbar = true;
    } else {
      this.showButtonToolbar = false;
    }
  }

  /**
   * Function to navigate to the selected collection and select the corresponding element in the toolbar
   * @param collection 
   */
  NavigateTo(collection: any) {
    this.router.navigateByUrl(collection.url);
    this.SetStyleToolbar(collection);
  }

  SetStyleToolbar(collection: any) {
    // select html element by id
    const element = document.getElementById(collection.id);
    if (element) {
      // remove class from all elements
      const elements = document.querySelectorAll(".toolbar-item-selected");
      elements.forEach((element) => {
        element.classList.remove("toolbar-item-selected");
      });
      // add class to the selected element
      element.classList.add("toolbar-item-selected");
    }
  }

  /**
   * Toggle sidebar (e.g., on button click for small screens)
   */
  toggleSidebar(bool?: boolean) {
    console.log('Toggle sidebar');
    if (bool == null) {
      this.isSidebarOpen = !this.isSidebarOpen;
    } else {
      console.log('Toggle sidebar:', bool);
      this.isSidebarOpen = !bool;
    }

    /*
    * If sidebar is open, set overflow to hidden to prevent scrolling
    */
    const bodyElement = document.querySelector('html');
    if (bodyElement != null && this.isSidebarOpen == false) {
      bodyElement.style.overflowY = 'scroll';
    } else if (bodyElement != null && this.isSidebarOpen == true) {
      bodyElement.style.overflowY = 'hidden';
    }
  }
}


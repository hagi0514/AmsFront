import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification-service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];
  loading = true;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.loading = false;
        this.notifications = notifications; // Directly assign to notifications array
        console.log('Notifications:', this.notifications);
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
        this.loading = false;
      }
    });
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      this.loadNotifications();
    });
  }

  deleteNotification(notificationId: number): void {
    this.notificationService.dismissNotification(notificationId).subscribe(() => {
      this.loadNotifications();
    });
  }
}

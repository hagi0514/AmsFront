import { Component } from '@angular/core';
// import { SqliteService } from 'app/services/mobile/sqlite.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent {
  items: any[] = [];

  // constructor(private sqliteService: SqliteService) {}

  async addItem(name: string, description: string) {
    // await this.sqliteService.insertData(name, description);
    this.loadItems();
  }

  async loadItems() {
    // this.items = await this.sqliteService.fetchData();
  }

  async ngOnInit() {
    await this.loadItems();
  }
}

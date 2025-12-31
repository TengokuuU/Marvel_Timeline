import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MCUItem } from './models/mcu-item.model';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  mcuItems: MCUItem[] = [];

  // Łapiemy referencję do kontenera z HTMLa
  @ViewChild('timeline') timeline!: ElementRef;

  constructor(private dataService: DataService) {}

ngOnInit() {
  this.dataService.getTimeline().subscribe({
    next: (data) => {
      // 1. Najpierw ładujemy surowe dane z JSON-a
      this.mcuItems = data;

      // 2. Potem sprawdzamy, co użytkownik już obejrzał
      this.loadWatchedStatus();
      
      console.log('Dane załadowane i zsynchronizowane');
    },
    error: (err) => console.error('Błąd ładowania danych:', err)
  });
}
  // Mechanizm przewijania kółkiem myszy
@HostListener('wheel', ['$event'])
onWheel(event: WheelEvent) {
  if (this.timeline) {
    this.timeline.nativeElement.scrollLeft += event.deltaY * 0.8; 
    
    // Blokujemy domyślny skok przeglądarki
    event.preventDefault();
  }
}

toggleWatched(item: any, event: Event) {
  event.stopPropagation();
  item.watched = !item.watched;
  this.saveToLocalStorage();
}

saveToLocalStorage() {
  // Wyciągamy tylko ID filmów, które mają watched: true
  const watchedIds = this.mcuItems
    .filter(item => item.watched)
    .map(item => item.id);
  
  localStorage.setItem('mcu_watched_list', JSON.stringify(watchedIds));
}

loadWatchedStatus() {
  const saved = localStorage.getItem('mcu_watched_list');
  if (saved) {
    const watchedIds: number[] = JSON.parse(saved);
    
    // Iterujemy po załadowanych przedmiotach i ustawiamy watched na true, 
    // jeśli ich ID znajduje się w liście zapisanej w przeglądarce
    this.mcuItems.forEach(item => {
      if (watchedIds.includes(item.id)) {
        item.watched = true;
      }
    });
  }
}
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RsvpService } from '../../services/rsvp.service';
import { Player } from '../../models/player.interface';
import { RsvpStatus } from '../../models/rsvp-status.enum';

@Component({
  standalone: true,
  selector: 'app-rsvp-manager',
  templateUrl: './rsvp-manager.component.html',
  styleUrls: ['./rsvp-manager.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class RsvpManagerComponent {
  playerName: string = '';
  playerId: string = '';
  selectedStatus: RsvpStatus = RsvpStatus.Maybe;

  rsvpStatuses = Object.values(RsvpStatus);

  constructor(public rsvpService: RsvpService) {}

  onSubmit(): void {
    if (!this.playerId || !this.playerName) return;

    const player: Player = {
      id: this.playerId.trim(),
      name: this.playerName.trim(),
    };

    this.rsvpService.addOrUpdateRsvp(player, this.selectedStatus);

    this.playerId = '';
    this.playerName = '';
    this.selectedStatus = RsvpStatus.Maybe;
  }

  get confirmedAttendees() {
    return this.rsvpService.getConfirmedAttendees();
  }

  get rsvpCounts() {
    return this.rsvpService.getRsvpCounts();
  }

  get allRsvps() {
    return this.rsvpService.getAllRsvps();
  }
}
import { Injectable } from '@angular/core';
import { RsvpEntry } from '../models/rsvp-entry.interface';
import { RsvpStatus } from '../models/rsvp-status.enum';
import { Player } from '../models/player.interface';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class RsvpService {
  private rsvpMap: Map<string, RsvpEntry> = new Map();

  constructor(private logger: LoggerService) {}

  addOrUpdateRsvp(player: Player, status: RsvpStatus): void {
    const entry: RsvpEntry = { player, status };
    this.rsvpMap.set(player.id, entry);
    this.logger.log(`RSVP updated: ${player.name} - ${status}`);
  }

  getConfirmedAttendees(): Player[] {
    return Array.from(this.rsvpMap.values())
      .filter(entry => entry.status === RsvpStatus.Yes)
      .map(entry => entry.player);
  }

  getRsvpCounts(): { total: number; confirmed: number; declined: number } {
    let confirmed = 0;
    let declined = 0;

    for (const entry of this.rsvpMap.values()) {
      if (entry.status === RsvpStatus.Yes) confirmed++;
      if (entry.status === RsvpStatus.No) declined++;
    }

    return {
      total: this.rsvpMap.size,
      confirmed,
      declined,
    };
  }

  getAllRsvps(): RsvpEntry[] {
    return Array.from(this.rsvpMap.values());
  }
}
import { RsvpStatus } from './rsvp-status.enum';
import { Player } from './player.interface';

export interface RsvpEntry {
  player: Player;
  status: RsvpStatus;
}
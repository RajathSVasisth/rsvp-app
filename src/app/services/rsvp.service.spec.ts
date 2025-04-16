import { RsvpService } from './rsvp.service';
import { RsvpStatus } from '../models/rsvp-status.enum';
import { Player } from '../models/player.interface';
import { LoggerService } from './logger.service';

describe('RsvpService', () => {
  let service: RsvpService;
  let loggerSpy: jasmine.SpyObj<LoggerService>;

  const mockPlayer: Player = { id: '1', name: 'Alice' };
  const anotherPlayer: Player = { id: '2', name: 'Bob' };

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    service = new RsvpService(loggerSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new RSVP entry', () => {
    service.addOrUpdateRsvp(mockPlayer, RsvpStatus.Yes);
    const all = service.getAllRsvps();
    expect(all.length).toBe(1);
    expect(all[0].player).toEqual(mockPlayer);
    expect(all[0].status).toBe(RsvpStatus.Yes);
  });

  it('should update an existing RSVP entry', () => {
    service.addOrUpdateRsvp(mockPlayer, RsvpStatus.No);
    service.addOrUpdateRsvp(mockPlayer, RsvpStatus.Yes);
    const updated = service.getAllRsvps()[0];
    expect(updated.status).toBe(RsvpStatus.Yes);
  });

  it('should return only confirmed attendees', () => {
    service.addOrUpdateRsvp(mockPlayer, RsvpStatus.Yes);
    service.addOrUpdateRsvp(anotherPlayer, RsvpStatus.No);
    const confirmed = service.getConfirmedAttendees();
    expect(confirmed.length).toBe(1);
    expect(confirmed[0]).toEqual(mockPlayer);
  });

  it('should count RSVP responses correctly', () => {
    service.addOrUpdateRsvp(mockPlayer, RsvpStatus.Yes);
    service.addOrUpdateRsvp(anotherPlayer, RsvpStatus.No);
    const counts = service.getRsvpCounts();
    expect(counts.total).toBe(2);
    expect(counts.confirmed).toBe(1);
    expect(counts.declined).toBe(1);
  });

  it('should call logger when RSVP is added or updated', () => {
    service.addOrUpdateRsvp(mockPlayer, RsvpStatus.Maybe);
    expect(loggerSpy.log).toHaveBeenCalledWith(`RSVP updated: Alice - Maybe`);
  });
});
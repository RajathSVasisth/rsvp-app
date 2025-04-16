import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RsvpManagerComponent } from './rsvp-manager.component';
import { RsvpService } from '../../services/rsvp.service';
import { LoggerService } from '../../services/logger.service';
import { RsvpStatus } from '../../models/rsvp-status.enum';
import { Player } from '../../models/player.interface';

describe('RsvpManagerComponent', () => {
  let component: RsvpManagerComponent;
  let fixture: ComponentFixture<RsvpManagerComponent>;
  let rsvpService: RsvpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsvpManagerComponent],
      providers: [RsvpService, LoggerService],
    }).compileComponents();

    fixture = TestBed.createComponent(RsvpManagerComponent);
    component = fixture.componentInstance;
    rsvpService = TestBed.inject(RsvpService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with Maybe as default RSVP status', () => {
    expect(component.selectedStatus).toBe(RsvpStatus.Maybe);
  });

  it('should not submit if playerId or playerName is empty', () => {
    spyOn(rsvpService, 'addOrUpdateRsvp');
    component.playerId = '';
    component.playerName = '';
    component.onSubmit();
    expect(rsvpService.addOrUpdateRsvp).not.toHaveBeenCalled();
  });

  it('should submit RSVP and reset form fields', () => {
    const player: Player = { id: '1', name: 'Alice' };
    const spy = spyOn(rsvpService, 'addOrUpdateRsvp');

    component.playerId = player.id;
    component.playerName = player.name;
    component.selectedStatus = RsvpStatus.Yes;

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(player, RsvpStatus.Yes);
    expect(component.playerId).toBe('');
    expect(component.playerName).toBe('');
    expect(component.selectedStatus).toBe(RsvpStatus.Maybe);
  });

  it('should return confirmed attendees from the service', () => {
    rsvpService.addOrUpdateRsvp({ id: '2', name: 'Bob' }, RsvpStatus.Yes);
    const confirmed = component.confirmedAttendees;
    expect(confirmed.length).toBe(1);
    expect(confirmed[0].name).toBe('Bob');
  });

  it('should return RSVP counts correctly', () => {
    rsvpService.addOrUpdateRsvp({ id: '1', name: 'Alice' }, RsvpStatus.Yes);
    rsvpService.addOrUpdateRsvp({ id: '2', name: 'Bob' }, RsvpStatus.No);
    const counts = component.rsvpCounts;
    expect(counts.total).toBe(2);
    expect(counts.confirmed).toBe(1);
    expect(counts.declined).toBe(1);
  });
});
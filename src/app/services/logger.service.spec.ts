import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    service = new LoggerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call console.log with formatted message', () => {
    const consoleSpy = spyOn(console, 'log');
    service.log('Hello test');
    expect(consoleSpy).toHaveBeenCalledWith('[Logger] Hello test');
  });
});

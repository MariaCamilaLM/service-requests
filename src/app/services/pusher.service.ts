import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private pusher: Pusher;
  private channel: any;

  constructor() {
    this.pusher = new Pusher(environment.soketiAppKey, {
        cluster: 'mt1',
        wsHost: environment.soketiHost,
        wsPort: 6001,
        forceTLS: false,
        disableStats: false,
        enabledTransports: ['ws'],
    });
  }

  public subscribeToChannel(channelName: string): void {
    this.channel = this.pusher.subscribe(channelName);
  }

  public bindToEvent(event: string, callback: (data: any) => void): void {
    if (this.channel) {
      this.channel.bind(event, callback);
    }
  }

  public unsubscribeFromChannel(channelName: string): void {
    if (this.channel) {
      this.pusher.unsubscribe(channelName);
    }
  }
}

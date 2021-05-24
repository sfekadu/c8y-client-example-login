import { Component, Input } from '@angular/core';
import { Client, BasicAuth } from '@c8y/client';
import { CumulocityService } from './c8y.service';

@Component({
  selector: 'c8y-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @Input() name: string;
  model = {
    user: '',
    password: '',
    tenant: ''
  };
  error = {
    shown: false,
    msg: ''
  };
  disabled = false;

  constructor(private cumulocity: CumulocityService) {}

  async login() {
    this.disabled = true;

    const client = new Client(
      new BasicAuth({
        user: this.model.user,
        password: this.model.password,
        tenant: this.model.tenant
      }),
      //`https://${this.model.tenant}.staging.c8y.io`
      `https://${this.model.tenant}.eu-latest.cumulocity.com`
    );

    console.log('USER: ' + this.model.user);
    console.log(`URL: https://${this.model.tenant}.eu-latest.cumulocity.com`);
    console.log('TENANT: ' + this.model.tenant);

    //https://www.npmjs.com/package/@c8y/client
    const auth = new BasicAuth({
      user: 'solomonfekadu@hotmail.com',
      password: '!Tat00ine',
      tenant: 'edwardspoc3'
    });
    const baseUrl = 'https://edwardspoc3.eu-latest.cumulocity.com';
    try {
      const client = await new Client(auth, baseUrl);
      let user = await client.user.current;
      console.log('LOGGED IN');

      //const user = await client.user.current;
      //this.cumulocity.client = client;
      //console.log(`DONE`);
      //console.log(client.user);
      //let user = await client.user.current();
      //let user = client.user.current;
      //this.cumulocity.client = client;

      //SUBSCRIBE
      //const list$ = client.inventory.list$();
      //list$.subscribe(data => console.log(data));

    } catch (ex) {
      this.cumulocity.client = null;
      this.error.shown = true;
      this.error.msg = ex.message;
    } finally {
      this.disabled = false;
    }
  }
}

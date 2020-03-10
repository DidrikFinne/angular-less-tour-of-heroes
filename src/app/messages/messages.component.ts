import { Component, OnInit } from '@angular/core';

import { MessageService }  from '../message.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})
export class MessagesComponent implements OnInit {

  //note that the injected messageService property must be public so we can bind it to the template
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}

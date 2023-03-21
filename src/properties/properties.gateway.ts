import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway()
export class PropertiesGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('connected')
  listenForMessages(@MessageBody() data: string) {
    return this.server.sockets.emit('connect', data);
  }
}

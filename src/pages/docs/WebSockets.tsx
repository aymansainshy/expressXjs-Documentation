import { CodeBlock } from '@/components/ui-custom/CodeBlock';

export function Gateways() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="gateways" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        WebSockets Gateways
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        WebSockets provide a way to build real-time, bidirectional communication between the server and clients. 
        Framework supports WebSockets out of the box using the <code>@framework/websockets</code> package.
      </p>

      <h2 id="installation" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Installation
      </h2>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ npm install @framework/websockets @framework/platform-socket.io`}
      />

      <h2 id="creating-gateway" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Creating a Gateway
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        A gateway is a class annotated with the <code>@WebSocketGateway()</code> decorator. It provides 
        methods for handling WebSocket connections and messages.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="chat.gateway.ts"
        code={`import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@framework/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(\`Client connected: \${client.id}\`);
  }

  handleDisconnect(client: Socket) {
    console.log(\`Client disconnected: \${client.id}\`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('message', {
      sender: client.id,
      content: payload,
      timestamp: new Date(),
    });
  }
}`}
      />

      <h2 id="registering-gateway" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Registering the Gateway
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="app.module.ts"
        code={`import { Module } from '@framework/common';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  providers: [ChatGateway],
})
export class AppModule {}`}
      />

      <h2 id="client-example" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Client Example
      </h2>

      <CodeBlock 
        language="javascript" 
        filename="client.js"
        code={`const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('message', (data) => {
  console.log('New message:', data);
});

// Send a message
socket.emit('message', 'Hello from client!');`}
      />

      <h2 id="gateway-decorators" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Gateway Decorators
      </h2>

      <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-6">
        <li><code>@WebSocketGateway()</code> - Marks a class as a WebSocket gateway</li>
        <li><code>@WebSocketServer()</code> - Injects the server instance</li>
        <li><code>@SubscribeMessage()</code> - Subscribes to incoming messages</li>
        <li><code>@ConnectedSocket()</code> - Injects the client socket</li>
        <li><code>@MessageBody()</code> - Extracts the message body</li>
      </ul>
    </div>
  );
}

export function Broadcasting() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="broadcasting" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Broadcasting
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Broadcasting allows you to send messages to multiple connected clients. Framework provides several 
        methods for broadcasting messages to different groups of clients.
      </p>

      <h2 id="broadcast-all" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Broadcast to All Clients
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="chat.gateway.ts"
        code={`@SubscribeMessage('message')
handleMessage(@MessageBody() data: string): void {
  // Broadcast to all connected clients
  this.server.emit('message', data);
}`}
      />

      <h2 id="broadcast-except-sender" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Broadcast to All Except Sender
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="chat.gateway.ts"
        code={`@SubscribeMessage('message')
handleMessage(
  @ConnectedSocket() client: Socket,
  @MessageBody() data: string,
): void {
  // Broadcast to all clients except the sender
  client.broadcast.emit('message', data);
}`}
      />

      <h2 id="rooms" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Rooms
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Rooms allow you to group clients and broadcast messages to specific groups:
      </p>

      <CodeBlock 
        language="typescript" 
        filename="chat.gateway.ts"
        code={`@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.join(room);
    client.emit('joined', room);
  }

  @SubscribeMessage('leave')
  handleLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.leave(room);
    client.emit('left', room);
  }

  @SubscribeMessage('room-message')
  handleRoomMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; message: string },
  ) {
    // Send to all clients in the room
    this.server.to(data.room).emit('message', {
      sender: client.id,
      message: data.message,
    });
  }
}`}
      />

      <h2 id="namespaces" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Namespaces
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="chat.gateway.ts"
        code={`@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): void {
    this.server.emit('message', data);
  }
}`}
      />

      <h2 id="acknowledgement" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Emitting with Acknowledgement
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="chat.gateway.ts"
        code={`@SubscribeMessage('message')
async handleMessage(
  @ConnectedSocket() client: Socket,
  @MessageBody() data: string,
): Promise<string> {
  // Process the message
  const result = await this.processMessage(data);
  
  // Return acknowledgement to the sender
  return 'Message received!';
}`}
      />
    </div>
  );
}

import * as http from 'http';
import * as serverHandlers from './serverHandlers';
import server from './server';
import {init} from '../middleware/cluster'

const Server: http.Server = http.createServer(server);

/**
 * Binds and listens for connections on the specified host
 */
//Server.listen(server.get('port'));
init(server.get('port'),Server)
/**
 * Server Events
 */
Server.on('error',
    (error: Error) => serverHandlers.onError(error, server.get('port')));
Server.on('listening',
    serverHandlers.onListening.bind(Server));

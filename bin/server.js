'user strict'
const app = require('../src/app');
const debug = require('debug')('balta:server');
const http = require('http');

const port = normalizarPorta(process.env.PORT || '8000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', tratarErro);
server.on('listening', escutandoExecucao );
console.log('API rodando na porta '+ port);


function normalizarPorta(valor){
    const port = parseInt(valor, 10);

    if(isNaN(port)){
        return valor;
    }

    if(port >= 0){
        return port;
    }

    return false;
}

function tratarErro(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code){
        case 'EACCES' :
            console.error(bind + ' é necessário ter privilégios avançados');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + ' já está sendo usado');
            process.exit(1);
            break;
        default:
        throw error;
    }
}

function escutandoExecucao(){
    const addr = server.address();
    const bind = typeof addr === 'string'
    ? 'pipe' + addr
    : 'port' + addr.port;
    debug('Escutando' + bind);
}
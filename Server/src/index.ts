// filepath: c:\Users\xkr01\OneDrive\Escritorio\Estacionamiento 1\Estacionamiento\Server\src\index.ts
import dotenv from 'dotenv';
dotenv.config();
// ...existing code...
import server from './server';

server.listen(3003, () => {
    console.log('Server is running on port 3003');
    console.log('http://localhost:3003');
});;
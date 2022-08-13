import {Pool} from 'pg'
import config from '../config'
import Error from '../interfaces/errorInterface'

const pool = new Pool({
    user:config.POSTGRES_USER,
    host:config.POSTGRES_HOST,
    database:config.NODE_ENV === 'dev' ? config.POSTGRES_DB : config.POSTGRES_DB_TEST,
    password:config.POSTGRES_PASSWORD,
    port:parseInt(config.POSTGRES_PORT as string , 10)
    
})

pool.on('error', (err:Error) => {
    console.log('Unexpected error on idle client', err)
    process.exit(-1)
})

export default pool

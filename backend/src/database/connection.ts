import { dataSource } from './dataSource'

export default dataSource.initialize().then(() => {
  console.log('Connection successfully')
}).catch(console.log)

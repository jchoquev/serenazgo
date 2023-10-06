import dynamic from 'next/dynamic'
 
const DynamicMap = dynamic(() => import('./Mapa'), {
  ssr: false,
})

export default DynamicMap;
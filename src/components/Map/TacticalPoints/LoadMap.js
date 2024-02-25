import dynamic from 'next/dynamic'
 
const DynamicMapTacticalPoints = dynamic(() => import('./Mapa'), {
  ssr: false,
})

export default DynamicMapTacticalPoints;
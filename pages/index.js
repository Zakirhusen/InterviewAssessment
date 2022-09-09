import { useRouter } from 'next/router';
import AllProducts from './allproducts'
export default function Home() {
  let router=useRouter()

  router.isReady?router.push("/allproducts"):""
  return (
<>
<AllProducts></AllProducts>
</>  
  
      );
}

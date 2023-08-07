import NavbarAdmin from "./Navbar";
export default function Template({Dynamic}){

    return <>
        <NavbarAdmin/>
        <div className='container mx-auto'>
            <Dynamic/>
        </div>
    </>;
}
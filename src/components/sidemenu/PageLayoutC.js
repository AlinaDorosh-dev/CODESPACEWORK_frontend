import MenuCandidates from "./MenuCandidates";


function PageLayoutC({ children}) {
 return (
 <div>
    <MenuCandidates/>
    {children}
 </div>
 );
}

export default PageLayoutC;

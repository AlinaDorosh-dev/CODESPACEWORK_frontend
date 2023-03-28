import MenuEmployers from './MenuEmployers';

function PageLayout({ children}) {
 return (
 <div>
    <MenuEmployers/>
    {children}
 </div>
 );
}

export default PageLayout;

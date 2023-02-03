const Pagination = ({totalPosts,postsPerPage,setCurrentPage,currentPage}) => {
    
    const pageNumbers  =[];
    
    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i)
 
    }
    return ( 
        <div className="Pagination">
            {
                pageNumbers.map((page,index)=>{
                    return(
                    <button key={index} onClick={()=>setCurrentPage(page)}  className={page === currentPage ? "active" : ""}> {page}</button>
                    );
                })
            }
            
            
        </div>
     );
}
 
export default Pagination;
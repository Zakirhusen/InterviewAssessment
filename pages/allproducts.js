import { useEffect, useState } from "react";

const AllProducts = ({ allProducts }) => {
  // stores data comes from server
  const products = allProducts;
  
  const [search, setSearch] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [sortValue, setSortValue] = useState('')
  const [productsToDisplay, setProductsToDisplay] = useState(products);
  
  // for pagination
  let NoOfItemsPerPage=10
  let NoOfPages=Math.ceil(productsToDisplay.length/NoOfItemsPerPage);
  const [pageNo, setPageNo] = useState(0)
  const [pageItems,setPageItems] = useState([])


  // Search function for search according to input value
  const searchFunc=(e)=>{
    let searchValue=e.target.value
    setSearch(e.target.value)
    const filteredProducts = searchValue.length === 0  ? products
: products.filter(currElem =>     {
 return !filterValue || filterValue=="product_name"?currElem.product_name.toLowerCase().includes(searchValue.toLowerCase()):String(currElem[filterValue]).toLowerCase().includes(searchValue.toLowerCase())
});
    setProductsToDisplay(filteredProducts)
  }

  // console.log("productToDisplay", productsToDisplay);
  // console.log("filterValue", filterValue);

  // Filter product
  const filterProducts=(e)=>{
    setFilterValue(e.target.value)

    // After selecting  filter value make search value empty and setDisplayProducts to products 
    setSearch("")
    setProductsToDisplay(products)
  }

// Sort products according to value
const sortProducts=(e)=>{
  let sortValue=e.target.value
  setSortValue(sortValue)

  const sortedProducts=!sortValue? products: [...products].sort((a,b)=>{
    if(sortValue=="Inc_id"||sortValue==="Incproduct_type"||sortValue==="Incsale_price"||sortValue==="Incoriginal_price") {
      return parseInt(a[sortValue.slice(3)]) - parseInt(b[sortValue.slice(3)])

    }else if(sortValue==="Dec_id"|| sortValue==="Decproduct_type"||sortValue==="Decsale_price"||sortValue==="Decoriginal_price") {      

      return  parseInt(b[sortValue.slice(3)])-parseInt(a[sortValue.slice(3)])
    }
    else if(sortValue=="Incdescription" || sortValue==="Incproduct_name"){
      return (a[sortValue.slice(3)]).toLowerCase() > (b[sortValue.slice(3)]).toLowerCase() ? 1 : -1

    }else if(sortValue=="Decdescription" || sortValue==="Decproduct_name"){
      return (a[sortValue.slice(3)]).toLowerCase() < (b[sortValue.slice(3)]).toLowerCase() ? 1 : -1
    }  
  })
  setProductsToDisplay(sortedProducts)
}

// pagination
const paginationFunc=(e)=>{
  setPageNo(e.target.value)
}

const incPage=()=>{
  setPageNo(+pageNo+1)
}
const decPage=()=>{
  setPageNo( +pageNo-1)
}
useEffect(() => {
  setPageItems(productsToDisplay.slice(pageNo*NoOfItemsPerPage,pageNo*NoOfItemsPerPage+NoOfItemsPerPage))
  // console.log(pageNo,NoOfPages)
},[pageNo,productsToDisplay]);

  return (
      <div className="allProducts">
        <div className="search-filter-container">
          <h1 className="search-heading">All Products</h1>
          <div className="search-filter">

      {/* sort section*/}

            <select  className="sort-bar" value={sortValue} onChange={(e)=>sortProducts(e)} name="" placeholder="select" id="">
              <option value="" placeholder="">Sort By</option>
              <option value="Inc_id">DateTime(Oldest first)</option>
              <option value="Dec_id">DateTime(Newest first)</option>
              <option value="Inc_id">Product ID L-H</option>
              <option value="Dec_id">Product ID H-L</option>
              <option value="Incproduct_name">Name A-Z</option>
              <option value="Decproduct_name">Name Z-A</option>
              <option value="Incoriginal_price">Original Price L-H</option>
              <option value="Decoriginal_price">Original Price H-L</option>
              <option value="Incsale_price">Sale Price L-H</option>
              <option value="Decsale_price">Sale Price H-L</option>
              <option value="Incproduct_type">Product Type L-H</option>
              <option value="Decproduct_type">Product Type H-L</option>
              <option value="Incdescription">Description A-Z</option>
              <option value="Decdescription">Description Z-A</option>
            </select>

            {/* filter */}

            <select  name="" className="filter-bar" value={filterValue} onChange={(e)=>filterProducts(e)} placeholder="select" id="">
              <option value="" placeholder="">Filter</option>
              <option value="date_n_time">Date and Time</option>
              <option value="_id">Product ID</option>
              <option value="product_name">Name</option>
              <option value="original_price">Original Price</option>
              <option value="sale_price">Sale Price</option>
              <option value="product_type">Product Type</option>
              <option value="description">Description</option>
            </select>

            {/* search bar */}

          <input type="text" className="search-bar" placeholder="Search" value={search} onChange={(e) => searchFunc(e)}/>
          </div>
        </div>
          <span style={{color:"white"}}>{productsToDisplay.length} entries found </span>
        <table>
          <tbody>
            <tr>
              <th>Sno</th>
              <th>Date and Time</th>
              <th>Product ID</th>
              <th>Name</th>
              <th>Original Price</th>
              <th>Sale Price</th>
              <th>Product Type</th>
              <th>Description</th>
            </tr>
            {pageItems.map((currElem, index) => {
              return (
                <tr key={Math.random()}>
                  <td>{index + 1}</td>
                  <td>{currElem.date_n_time}</td>
                  <td>{currElem._id}</td>
                  <td>{currElem.product_name}</td>
                  <td>{currElem.original_price}</td>
                  <td>{currElem.sale_price}</td>
                  <td>{currElem.product_type}</td>
                  <td>{currElem.description.slice(0,20)}{currElem.description.length>20?"...":""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* pagination */}
        
        <div className="pagination-container">
        <button  className="pagination-btn" onClick={decPage} disabled={pageNo<1?true:false}>prev</button>
        {  Array(Math.ceil(productsToDisplay.length/10)).fill("2").map((elem,index)=>{
            return <button className={`pagination-btn ${pageNo==index?"active":""}`} onClick={(e)=>paginationFunc(e)} disabled={false} key={index} value={index} >{index+1}</button>
          })}
        <button  className="pagination-btn" onClick={incPage} disabled={pageNo>NoOfPages-2?true:false} >next</button>
        </div>
      </div>
  );
};

export const getServerSideProps = async (context) => {
  // console.log("server side props");
  let result = await fetch(
    "https://react-tasks-nodejs-api.herokuapp.com/product/list",
    {
      headers: {
        "Content-Type": "application/json",
        api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
      },
    }
  );
  let res = await result.json();
  // deep copy of response data and modification according to we have
  res=JSON.parse(JSON.stringify(res))
  let data=res.message.map((elem,index)=>{
  elem["date_n_time"]=new Date(elem["date_n_time"]).toLocaleDateString().replaceAll("/","-")
  elem["_id"]=String(elem["_id"])
  return elem
  })
  // console.log("data", data);
  return {
    props: {
      allProducts: data,
    },
  };
};
export default AllProducts;

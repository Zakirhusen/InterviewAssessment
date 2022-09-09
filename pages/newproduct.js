import { useState } from "react";
// react tostify used show message upon creating new product entry
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewProduct = () => {

  // Handling form input feild value

  const [inputs, setInputs] = useState({
    productName: "",
    originalPrice: "",
    salePrice: "",
    productType: "",
    description: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => {
      return { ...prevState, [name]: value };
    });
  };


// Funtion for validating inputs

const validation=()=>{
      if(inputs.productName.length > 0 &&
      !isNaN(inputs.productType) &&
      inputs.description.length > 0 && !isNaN(inputs.originalPrice)
      && !isNaN(inputs.salePrice)
      ){
        return true
      }
}

  //Upon submitting creates new product in the database

  const submitHandler = async (e) => {
    e.preventDefault();
    // Chcking validation by calling function
    if (validation()) {
      const userData = {
        product_name: inputs.productName,
        original_price: inputs.originalPrice,
        sale_price: inputs.salePrice,
        product_type: inputs.productType,
        description: inputs.description,
      };
      // console.log("userData", userData);
      const result = await fetch(
        "https://react-tasks-nodejs-api.herokuapp.com/product/add_new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
          },
          body: JSON.stringify(userData),
        }
      );
      const response = await result.json();
      if (response.status) {
        // Upon insterign record display successful message
        toast.success("Data submited succesfully", { position: "top-center" });
        setInputs({
          productName: "",
          originalPrice: "",
          salePrice: "",
          productType: "",
          description: "",
        })
      } else {
        toast.error("! Server Error", {
          position: "top-center",
        });
      }
    } else {
      toast.error("! Feilds cant be empty Or Price must   be Number ", { position: "bottom-center" });
    }
  };
  return (
    <div className="creat-product-main-div main-div">
      <ToastContainer />
      <div className="sub-div">
        <div className="heading-create-product">Create New Product</div>
        <p></p>
        <div className="create-product-div">
          <form onSubmit={(e) => submitHandler(e)}>
            <input className="input" type="text" value={inputs.productName} onChange={(e) => {inputHandler(e);}} name="productName" id="" placeholder="Product Name"/>
            <input className="input" type="text" value={inputs.originalPrice} onChange={(e) =>{inputHandler(e);}} name="originalPrice" id="" placeholder="Original Price" />
            <input className="input" type="text" value={inputs.salePrice} onChange={(e) => {inputHandler(e);}} name="salePrice" id="" placeholder="Sale Price"/>
            <input className="input" type="text" value={inputs.productType} onChange={(e) => {inputHandler(e); }} name="productType" id="" placeholder="Product Type"/>
            <textarea className="input desc" type="text" value={inputs.description} onChange={(e) => { inputHandler(e); }} name="description" id="" placeholder="Description" cols="60" rows="50"></textarea>
            <button type="submit" className="input input-btn">
              Create
            </button>
          </form>
        </div>
        <div>
          <div>* Fields cannot be empty</div>
          <div>* Product Type and Price must be a Number</div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;

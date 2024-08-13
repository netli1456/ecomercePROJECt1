// CategoryMiddleWare.js
export function calculateCategory(req, res, next) {
    const { price, discount } = req.body;
  
    if (price >= 500 && discount >= 50) {
      req.body.category = "highdiscount";
    } else if (price >= 100 && price < 500 && discount >= 20 && discount < 50) {
      req.body.category = "lowdiscount";
    } else if (price < 100 && discount < 20) {
      req.body.category = "lowprice";
     
    } else if(price >=5000 && price < 10000 && discount >20 && discount < 50) {
        req.body.category = "highprice";
    }
    
    else {
      req.body.category = "random";
    }
    next();
  }
  

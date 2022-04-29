import Product from '../models/product-model.js';
import axios from "axios";
import cheerio from "cheerio"
import request from 'request';
import mongoose from 'mongoose';
const compareProduct = async (req, res) => {/* 
    const { productId } = req.params; */
    let data=[];
    try {
   /*  const id = mongoose.Types.ObjectId(productId)

    const productCategory = await Product.findById(id).select({category:1}).lean();
    console.log(productCategory); */
    const productCategory = {
        category : "Piano"
    }
    console.log(productCategory.category)
    let url = ""
    if(productCategory.category == "Piano"){
        url = "https://www.toutpourlamusique.ch/10-pianos?q=Cat%C3%A9gories+d%27instruments-Contr%C3%B4leurs+midi-Pianos+num%C3%A9riques-Synth%C3%A9tiseurs"
    }
    else if (productCategory.category == "Guitare"){
        url = "https://www.toutpourlamusique.ch/28-guitares-classique"
    }
    else{ console.log("no category found for this product."); res.send("cant compare this product")}

    const response = await axios.get(url);
    const html = response.data;
    const products = [];
    
    html.products.map((product)=>{
            try {
            const productUrl = product.link;
            const price = product.price;
            const productName = product.name;
            const productDescription = product.description_short;

            // fasarha bel klem 
            request(productUrl, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                  var $ = cheerio.load(html), text = [];  
                  $('.specs-left-column').each(function () {
                    const title = $(this).text()
                    data.push({title})
                  });
                  $('.specs-rigth-column').each(function () {
                    const detail = $(this).text(); 
                    data.push({detail})

                  });
               }
              })

              data.push({productName, price, productDescription})
              return data
        } catch (error) {
            console.log(error)
        }

        })
        
    }
        catch (error) {
            console.log(error)
        }

        res.send(data)
};


export {
	compareProduct,
};

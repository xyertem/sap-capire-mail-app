//namespace sap.capire.mail.app.srv;

using { sap.capire.mail.app.db as model } from '../../db/schema';


@path:'productservice'
service ProductService {
 entity Products as projection on model.Products;
 entity ProductDetails as projection on model.ProductDetails;
}
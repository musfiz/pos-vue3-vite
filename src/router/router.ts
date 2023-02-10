import Login from '../views/auth/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Category from '../views/category/Category.vue'
import Subcategory from '../views/subcategory/Subcategory.vue'
import Vendor from '../views/vendor/Vendor.vue'
import Variant from '../views/variant/Variant.vue'
import Product from '../views/product/Product.vue'
import ProductAdd from '../views/product/ProductAdd.vue'
import Stock from '../views/stock/Stock.vue'
import StockAdd from '../views/stock/StockAdd.vue'
import SalesRegister from '../views/register/SalesRegister.vue'
import PurchaseRegister from '../views/register/PurchaseRegister.vue'

const routes = [
  { path: "/", name: "home", component: Dashboard },
  { path: "/login", name: "login", component: Login },
  { path: "/category", name: "category.view", component: Category },
  { path: "/subcategory", name: "subcategory.view", component: Subcategory },
  { path: "/vendor", name: "vendor.view", component: Vendor },
  { path: "/variant", name: "variant.view", component: Variant },
  { path: "/product", name: "product.view", component: Product },
  { path: "/product/add", name: "product.add", component: ProductAdd },
  { path: "/stock", name: "stock.view", component: Stock },
  { path: "/stock/add", name: "stock.add", component: StockAdd },
  { path: "/register/sales", name: "register.sales", component: SalesRegister },
  { path: "/register/purchase", name: "register.purchase", component: PurchaseRegister },
]

export default routes;
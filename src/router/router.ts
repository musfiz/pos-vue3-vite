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
import Customer from '../views/customer/Customer.vue'
import Supplier from '../views/supplier/Supplier.vue'
import PageNotFound from '../views/layouts/PageNotFound.vue'

const routes = [
  { path: "/", name: "home", component: Dashboard, meta: {requiresAuth: true} },
  { path: "/category", name: "category.view", component: Category, meta: {requiresAuth: true}},
  { path: "/subcategory", name: "subcategory.view", component: Subcategory, meta: {requiresAuth: true}},
  { path: "/vendor", name: "vendor.view", component: Vendor },
  { path: "/variant", name: "variant.view", component: Variant },
  { path: "/product", name: "product.view", component: Product },
  { path: "/product/add", name: "product.add", component: ProductAdd },
  { path: "/stock", name: "stock.view", component: Stock },
  { path: "/stock/add", name: "stock.add", component: StockAdd },
  { path: "/register/sales", name: "register.sales", component: SalesRegister },
  { path: "/register/purchase", name: "register.purchase", component: PurchaseRegister },
  { path: "/customer", name: "customer.view", component: Customer },
  { path: "/supplier", name: "supplier.view", component: Supplier },
  { path: '/:pathMatch(.*)*',component: PageNotFound } 
]

export default routes;
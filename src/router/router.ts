import Login from '../views/auth/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Category from '../views/category/Category.vue'
import Stock from '../views/stock/Stock.vue'
import StockAdd from '../views/stock/StockAdd.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/category",
    name: "category.view",
    component: Category
  },
  {
    path: "/stock",
    name: "stock.view",
    component: Stock,
  },
  {
    path: "/stock/add",
    name: "stock.add",
    component: StockAdd,
  },
]

export default routes;
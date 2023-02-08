import Login from '../views/auth/Login.vue'
import Index from '../views/layouts/Index.vue'
import Stock from '../views/stock/Stock.vue'
import StockAdd from '../views/stock/StockAdd.vue'

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Index
  },
  {
    path: "/login",
    name: "login",
    component: Login
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
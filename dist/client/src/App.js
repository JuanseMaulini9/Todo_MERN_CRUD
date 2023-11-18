"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const RegisterPage_1 = __importDefault(require("./pages/RegisterPage"));
const LoginPage_1 = __importDefault(require("./pages/LoginPage"));
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path='/' element={<h1>Home page</h1>}/>
        <react_router_dom_1.Route path='/login' element={<LoginPage_1.default />}/>
        <react_router_dom_1.Route path='/register' element={<RegisterPage_1.default />}/>
        <react_router_dom_1.Route path='/tasks' element={<h1>tasks page</h1>}/>
        <react_router_dom_1.Route path='/add-task' element={<h1>new task</h1>}/>
        <react_router_dom_1.Route path='/task/:id' element={<h1>update task</h1>}/>
        <react_router_dom_1.Route path='/profile' element={<h1>profile</h1>}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;

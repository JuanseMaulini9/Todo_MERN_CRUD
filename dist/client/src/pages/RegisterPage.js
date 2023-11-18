"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const auth_1 = require("../api/auth");
function RegisterPage() {
    const { register, handleSubmit } = (0, react_hook_form_1.useForm)();
    return (<div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={handleSubmit((values) => __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, auth_1.registerRequest)(values);
            console.log(res);
        }))}>
        <input type="text" {...register("username", { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="username"/>
        <input type="email" {...register("email", { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email"/>
        <input type="password" {...register("password", { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password"/>
        <button>Register</button>
      </form>
    </div>);
}
exports.default = RegisterPage;

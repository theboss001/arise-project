import { ProviderGuard } from "../_providers/Provider.guard.js";
import { ModuleGuard } from "../_modules/Module.guard.js";
import { ExportGuard } from "../_exports/Export.guard.js";
import { UserProductProvider } from "../_providers/UserProduct.provider.js";
import { UserModuleExport } from "../_exports/UserProduct.export.js";
import { UserProductModule } from "../_modules/UserProduct.module.js";
import { PrintingServiceProvider } from "../_providers/PrintingService.provider.js";

export class Bootstapp {
  // static suppliers that play role of provider, module, and exports in frameworks
    static providers = [];
    static modules = [];
    static exports = [];

    static _init_() {
        //triggers all the suppliers
        let stack = [];
        [stack = [...this.modules, ...this.providers, ...this.exports]];
        // console.log(stack.length);
         for(let k = 0; k < stack.length; k++) {
          console.log(`starting ${stack[k].name}`, new stack[k]);
         }
    }
    /**
     * @param {Object | Array } set - parameter that provide Objects for binding
     * @param {Array} context - parameter that provide static suppliers
     */
    _sets (set, context) {
      if(!arguments[0].length && Object.prototype.toString.call(arguments[0]) === "[object Function]") {
        context.push(set)
        return context
      }
      for( let i = 0; i < set.length; i++) {
        context.push(set[i])
      }
      return context
    }
    constructor (
      _provide,
      _export,
      _module
    ) {
      this._sets(_provide, Bootstapp.providers)
      this._sets(_module, Bootstapp.modules)
      this._sets(_export, Bootstapp.exports)
      Bootstapp._init_()
    }
}
export const app = new Bootstapp(
  [
    ProviderGuard,
    UserProductProvider,
    PrintingServiceProvider
  ],
 [ 
  ExportGuard,
  UserModuleExport,
],
  [
    ModuleGuard,
    UserProductModule
  ]
);

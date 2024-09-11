import { ProviderGuard } from "../_providers/Provider.guard.js";
import { ModuleGuard } from "../_modules/Module.guard.js";
import { ExportGuard } from "../_exports/Export.guard.js";
import { UserProductProvider } from "../_providers/UserProduct.provider.js";
import { UserModuleExport } from "../_exports/UserProduct.export.js";
import { UserProductModule } from "../_modules/UserProduct.module.js";
import { PrintingServiceProvider } from "../_providers/PrintingService.provider.js";

export class Bootstapp {
  // Static arrays to hold providers, modules, and exports
  static providers = [];
  static modules = [];
  static exports = [];

  // Initializes all the suppliers
  static _init_() {
    const stack = [...this.modules, ...this.providers, ...this.exports];
    for (let k = 0; k < stack.length; k++) {
      console.log(`Starting ${stack[k].name}`, new stack[k]());
    }
  }

  /**
   * Adds objects to the specified context array.
   * @param {Object | Array} set - The object(s) to add.
   * @param {Array} context - The array to which the objects will be added.
   * @returns {Array} The updated context array.
   */
  _sets(set, context) {
    // If set is not an array, wrap it in an array
    if (!Array.isArray(set)) {
      set = [set];
    }
    context.push(...set);
    return context;
  }

  constructor(_provide, _export, _module) {
    this._sets(_provide, Bootstapp.providers);
    this._sets(_module, Bootstapp.modules);
    this._sets(_export, Bootstapp.exports);
    Bootstapp._init_();
  }
}

// Application instance with specified providers, exports, and modules
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

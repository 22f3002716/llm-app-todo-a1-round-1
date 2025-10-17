var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new Promise(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new Promise(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// TypeScript version compiled to JS for logic.ts
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, P = Object.getOwnPropertySymbols(s); i < P.length; i++) {
            if (e.indexOf(P[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, P[i]))
                t[P[i]] = s[P[i]];
        }
    return t;
};
// No runtime code needed. The built in JS is the same as the above logic.ts code.
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** Provides a nav item that works recursively for sub-nav */
let NavItemComponent = class NavItemComponent {
    /** Constructs this component */
    constructor(router, cdr, navigation) {
        this.router = router;
        this.cdr = cdr;
        this.navigation = navigation;
    }
    /** Whether the url is active */
    get isUrlActive() {
        let urls = this.router.url.split('/').slice(1);
        let isActive;
        let urlArrays = this.navigation.getUrlsArray(this.data);
        let index = urlArrays.indexOf(this.data.url);
        isActive = index !== 0 ?
            (urlArrays[index] === urls[index]) && (urlArrays[index - 1] === urls[index - 1]) :
            urls.indexOf(this.data.url) > -1 ? true : false;
        return isActive;
    }
    /** Initializes this component */
    ngOnInit() {
        // this.initNavItems();
        // this.cdr.detectChanges();
    }
    /** Triggers change when there's an update on the nav item data */
    ngOnChanges() {
        // this.initNavItems();
        // this.cdr.detectChanges();
    }
    /** Initalizes the nav items and set their each item parent accordingly */
    initNavItems() {
        this.data.toggle = this.isUrlActive;
    }
    /** Go to the URL of that nav item or toggle sub-nav */
    goto(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item) {
                this.data.toggle = !this.data.toggle;
                this.cdr.detectChanges();
                return;
            }
            const navItemVisitable = item.url && item.children && item.visitAnyway;
            if (navItemVisitable)
                return this.router.navigate(this.navigation.getUrlsArray(item));
            if (item.children) {
                this.data.toggle = !this.data.toggle;
                this.cdr.detectChanges();
            }
            const navItemIsLast = item.url && !item.children;
            if (navItemIsLast) {
                this.router.navigate(this.navigation.getUrlsArray(item));
            }
        });
    }
};
__decorate([
    core_1.Input()
], NavItemComponent.prototype, "data", void 0);
NavItemComponent = __decorate([
    core_1.Component({
        selector: 'app-nav-item',
        templateUrl: 'nav-item.html',
        styleUrls: ['nav-item.scss']
    })
], NavItemComponent);
exports.NavItemComponent = NavItemComponent;
//# sourceMappingURL=nav-item.js.map
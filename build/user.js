"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(name, email, age, languages) {
        this.username = name;
        this.email = email;
        this.age = age;
        this.languages = languages;
        this.offers = new Array();
        this.cv = [];
    }
    User.prototype.setJobOffers = function (offers) {
        this.offers = offers;
    };
    User.prototype.addJobOffer = function (offer) {
        this.offers.push(offer);
    };
    User.prototype.getJobsOffers = function () {
        return this.offers;
    };
    User.prototype.setLanguages = function (languages) {
        this.languages = languages;
    };
    User.prototype.getLanguages = function () {
        return this.languages || [];
    };
    return User;
}());
exports.User = User;

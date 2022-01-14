"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offers = void 0;
var offers;
(function (offers) {
    var JobOffer = /** @class */ (function () {
        function JobOffer() {
            this.afinity = -1;
            this.info = {};
            this.criteria = undefined;
        }
        JobOffer.prototype.getAfinity = function () {
            return this.afinity;
        };
        JobOffer.prototype.setAfinity = function (afinity) {
            this.afinity = afinity;
        };
        JobOffer.prototype.getInfo = function () {
            return this.info;
        };
        JobOffer.prototype.setInfo = function (info) {
            this.info = info;
        };
        JobOffer.prototype.getCriteria = function () {
            return this.criteria;
        };
        JobOffer.prototype.setCriteria = function (criteria) {
            this.criteria = criteria;
        };
        return JobOffer;
    }());
    offers.JobOffer = JobOffer;
})(offers = exports.offers || (exports.offers = {}));

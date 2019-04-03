import { statusOptions } from "@/constants.js";

export default function QueryOptions() {
    let self = this;

    self.term = "";
    self.filter = "";
    self.status = statusOptions[1].value;
    self.position = 0;
    self.limit = 0;
    self.order = "";

    self.toURLParams = function() {
        let params = [];
        if (self.term && self.term.trim() != "")
            params.push("term="+self.term.trim());
        if (self.filter && self.filter.trim() != "")
            params.push("filter="+self.filter.trim());
        if (self.status && self.status != 0)
            params.push("status="+self.status);
        if (self.position && self.position != 0)
            params.push("position="+self.position);
        if (self.limit && self.limit != 0)
            params.push("limit="+self.limit);
        if (self.order && self.order != 0)
            params.push("order="+self.order);

        let reduceFunction = (accumulator, currentValue) => {
            return accumulator + (accumulator === "?" ? "" : "&") + currentValue;
        }

        return params.length > 0 ? params.reduce(reduceFunction, "?") : "";
    }
}
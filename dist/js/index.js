"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.DB)
    .then(() => {
    console.log("DB connected");
    app_1.default.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.DB}`);
    });
});
//# sourceMappingURL=index.js.map
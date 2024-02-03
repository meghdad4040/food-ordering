const { Schema, models, model, default: mongoose } = require("mongoose");

const ExtraPriceSchema = new Schema({
 name: String,
 price: Number,
})

const MenuItemSchema = new Schema({
 name: { type: String },
 image: { type: String },
 description: { type: String },
 category: { type: mongoose.Types.ObjectId },
 basePrise: { type: Number },
 sizes: { type: [ExtraPriceSchema] },
 extraIngredientPrices: { type: [ExtraPriceSchema] },
}, { timestamps: true })

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema)
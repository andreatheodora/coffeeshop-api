module.exports = mongoose => {
    const Ingredient = mongoose.model(
        "ingredient",
        mongoose.Schema({
            name: String,
            category: String,
            stock: Number,
            price: Number
        },
        {
            timestamps: true
        })
    );
    
    return Ingredient;
}
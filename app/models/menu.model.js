module.exports = mongoose => {
    const Menu = mongoose.model(
        "menu",
        mongoose.Schema({
            name: String,
            description: String,
            baseIngredients: Array,
            optionalIngredients: Array,
            basePrice: Array
        },
        {
            timestamps: true
        })
    );
    
    return Menu;
}
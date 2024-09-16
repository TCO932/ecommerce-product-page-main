class Product {
    constructor(manufacturer, name, description, currentPrice, discount, oldPrice, quantity, img) {
        this.manufacturer = manufacturer
        this.name = name
        this.description = description
        this.currentPrice = currentPrice
        this.discount = discount
        this.oldPrice = oldPrice
        this.quantity = quantity
        this.img = img
    }
}

export { Product }
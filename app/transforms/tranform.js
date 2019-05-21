module.exports = class Transform{

    transformCollections(items) {
        return items.map(this.transform.bind(this));
    }
}
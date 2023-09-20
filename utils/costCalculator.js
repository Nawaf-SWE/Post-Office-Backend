const { fees } = require("../models");

async function calculatePackageCost(shippingType, weight, packageCategory) {
    // Constants for cost calculation

    const REGULAR_SHIPPING_COST_PER_KG = await (await fees.findByPk(1)).factor;
    const EXPRESS_SHIPPING_COST_PER_KG = await (await fees.findByPk(2)).factor;
    const FRAGILE_PACKAGE_COST_FACTOR = await (await fees.findByPk(3)).factor;
    const CHEMICAL_PACKAGE_COST_FACTOR = await (await fees.findByPk(4)).factor;
    const LIQUID_PACKAGE_COST_FACTOR = await (await fees.findByPk(5)).factor;

    // Calculate the base cost based on weight and shipping type
    let baseCost;
    if (shippingType === "Regular") {
        baseCost = REGULAR_SHIPPING_COST_PER_KG * weight;
    } else if (shippingType === "Express") {
        baseCost = EXPRESS_SHIPPING_COST_PER_KG * weight;
    } else {
        return "Invalid shipping type provided!";
    }

    // Calculate the additional cost based on the package category
    let additionalCost;
    switch (packageCategory) {
        case "Fragile":
            additionalCost = baseCost * FRAGILE_PACKAGE_COST_FACTOR;
            break;
        case "Chemical":
            additionalCost = baseCost * CHEMICAL_PACKAGE_COST_FACTOR;
            break;
        case "Liquid":
            additionalCost = baseCost * LIQUID_PACKAGE_COST_FACTOR;
            break;
        case "Regular":
            additionalCost = 0; // No additional cost for regular packages
            break;
        default:
            return "Invalid package category provided!";
    }

    // Calculate the total cost
    const totalCost = baseCost + additionalCost;

    return totalCost;
}
module.exports = calculatePackageCost;

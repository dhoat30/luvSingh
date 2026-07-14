
export function calculateWebsitePrice(formData, fieldsData) {
    let totalPrice = 0;
    let numberOfPages = formData['number_of_pages_needed'] || 0;  // Default to 0 if not yet selected

    fieldsData.forEach(field => {
        const value = formData[field.id];
        if (!value) return;  // Skip if no value is selected

        if (field.type === 'slider') {
            // Assume this handles the number of pages directly
            totalPrice += value * field.price;
        } else if (field.type === 'chip' && Array.isArray(value)) {
            // Sum prices for all selected options in a chip field
            value.forEach(val => {
                const option = field.options.find(opt => opt.value === val);
                if (option) totalPrice += option.price;
            });
        } else if (field.type === 'select' || field.type === 'radio') {
            // For radio or single select, find the selected option and adjust price calculation based on `priceType`
            const selectedOption = field.options.find(opt => opt.value === value);
            if (selectedOption) {
                if (field.priceType === 'fixed' || field.priceType === 'base') {
                    totalPrice += selectedOption.price;
                } else if (field.priceType === 'per-page') {
                    totalPrice += numberOfPages * selectedOption.price; // Multiply by number of pages
                }
            }
        }
    });

    return totalPrice;
}

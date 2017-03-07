export const formatLocation = (location) => {
    const streetAddressLine2 = location.streetAddressLine2 ? ` ${location.streetAddressLine2}` : ''
    const localityInfo = `${location.city} ${location.state} ${location.postalCode}`
    return `${location.streetAddressLine1}${streetAddressLine2}, ${localityInfo}`
}

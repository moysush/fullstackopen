export const getInitial = (name) => {
    return name ? name.trim().charAt(0).toUpperCase() : "?"
}
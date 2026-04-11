/**
 * A utility function to sort an array of objects by a date property.
 *
 * @param data - The array of objects to sort.
 * @param dateKey - The key of the date property in the objects.
 * @returns A new array sorted by the specified date key.
 */
export const sortByDate = <T>(data: T[], dateKey: keyof T): T[] => {
    return data.sort((a, b) => {
        const dateA = new Date(a[dateKey] as string).getTime();
        const dateB = new Date(b[dateKey] as string).getTime();
        return dateB - dateA;
    });
};

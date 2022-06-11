const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0; // when it's set to 0, mongo returns ALL of the documents in the collection

function getPagination(query) {
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER; // page = 1 as DEFAULT
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT; 
    // cuz if u pass it a string, it will convert it to a number (query.limit is a string!!)
    const skip = (page - 1) * limit;

    return {
        skip,
        limit,
    };
}

module.exports = {
    getPagination,
};
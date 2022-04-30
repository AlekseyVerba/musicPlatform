import { TypeFilter } from "src/types/filter.enum"

class HelpFunctions {

    createPopulateFilter(path: string, offset: number, count: number , searchValue: string, searchSelect: string) {
        const  populateFilter: any = {
            path, 
            options: {
            limit: count,
            
            skip: offset
            },
            match: {
                name: {$regex: searchValue},
            },
            populate: "user"

        }

        switch(searchSelect) {

            case TypeFilter.CREATE: {
                populateFilter.options.sort = {date: -1, _id : 1}
                break
            }

            case TypeFilter.NAME: {
                populateFilter.options.sort = {name: 1, _id : 1}
                break
            }

            case TypeFilter.CREATOR: {
                populateFilter.options.sort = {user: -1, _id : 1}
                break
            }

            case TypeFilter.LISTEN: {
                populateFilter.options.sort = {listens: -1, _id : 1}
                break
            }

            case TypeFilter.LIKE: {
                populateFilter.options.sort = {likes: -1, _id : 1}
                break
            }

            default: {
                
                break
            }

        }

        return populateFilter

    }

}

export default new HelpFunctions()